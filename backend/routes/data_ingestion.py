from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
import pandas as pd
import json
import boto3
from botocore.exceptions import NoCredentialsError
from utils.preprocessing import data_preprocessing
import os

data_ingestion_bp = Blueprint('data_ingestion', __name__)

ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls'}

s3_client = boto3.client('s3')
BUCKET_NAME ="darkflow-backend-storage"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@data_ingestion_bp.route('/upload', methods=['POST'])
def upload_dataset():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    target_variable = request.form.get('target_variable')
    primary_key = request.form.get('primary_key')

    if file.filename == '':
        return jsonify({"error": "No file exists"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        try:
            # Upload the file to S3
            s3_client.upload_fileobj(file, BUCKET_NAME, filename)

            # Read file from S3 using boto3 client
            s3_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=filename)
            file_content = s3_object['Body'].read()

            # Load the data into a pandas DataFrame
            if filename.endswith('.csv'):
                df = pd.read_csv(pd.io.common.BytesIO(file_content))
            elif filename.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(pd.io.common.BytesIO(file_content))
            else:
                return jsonify({"error": "File format not supported"}), 400
            
            # Preprocess the data
            preprocessed_df = data_preprocessing(df, exclude_columns={primary_key, target_variable}, target_column=target_variable)

            # Prepare preprocessed data for upload
            preprocessed_filename = 'preprocessed_data.csv'
            preprocessed_buffer = preprocessed_df.to_csv(index=False).encode('utf-8')
            s3_client.put_object(Bucket=BUCKET_NAME, Key=preprocessed_filename, Body=preprocessed_buffer)
            
            # Prepare metadata for upload
            metadata = {
                "primary_key": primary_key,
                "target_variable": target_variable,
                "columns": preprocessed_df.columns.tolist(),
                "file_name": filename
            }
            metadata_buffer = json.dumps(metadata).encode('utf-8')
            metadata_filename = 'metadata.json'
            s3_client.put_object(Bucket=BUCKET_NAME, Key=metadata_filename, Body=metadata_buffer)

            s3_file_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{filename}'
            return jsonify({"message": "File uploaded and processed successfully", "s3_url": s3_file_url}), 200
        except NoCredentialsError:
            return jsonify({"error": "Credentials not available"}), 403
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "File format not supported"}), 400
