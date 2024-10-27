from flask import jsonify, Blueprint
import pandas as pd
import json
import boto3
from io import BytesIO
from botocore.exceptions import NoCredentialsError

data_visualization = Blueprint("data_viz", __name__)

# Initialize S3 client
s3_client = boto3.client('s3')
BUCKET_NAME = "darkflow-backend-storage"

@data_visualization.route("/get_data_json", methods=["GET"])
def get_data_viz():
    try:
        # Retrieve metadata from S3
        metadata_object = s3_client.get_object(Bucket=BUCKET_NAME, Key='metadata.json')
        metadata = json.loads(metadata_object['Body'].read())

        # Get filename from metadata and check validity
        filename = metadata.get("file_name")
        if not filename:
            return jsonify({"error": "No filename specified in metadata"}), 400

        # Retrieve data file from S3
        data_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=filename)

        # Read the data into a DataFrame based on file type
        if filename.endswith('.csv'):
            df = pd.read_csv(BytesIO(data_object['Body'].read()), encoding='ISO-8859-1')
        elif filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(BytesIO(data_object['Body'].read()))
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        # Convert DataFrame to JSON-compatible dictionary
        data = df.to_dict(orient='list')

        return jsonify(data)
    
    except NoCredentialsError:
        return jsonify({"error": "Credentials not available"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 400
