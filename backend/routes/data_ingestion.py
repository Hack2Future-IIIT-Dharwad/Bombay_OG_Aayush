from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
import pandas as pd
import os
import json
from utils.preprocessing import data_preprocessing

data_ingestion_bp = Blueprint('data_ingestion', __name__)

ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@data_ingestion_bp.route('/upload', methods=['POST'])
def upload_dataset():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}, 400)
    
    file = request.files['file']
    target_variable = request.form.get('target_variable')
    primary_key = request.form.get('primary_key')

    if file.filename == '':
        return jsonify({"error": "No file exists"}, 400)
    
    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)

        os.makedirs(os.path.join(os.getcwd(), 'uploads'), exist_ok=True)

        save_path = os.path.join(os.getcwd(), 'uploads', filename)
        file.save(save_path)

        try:
            if filename.endswith('.csv'):
                df = pd.read_csv(save_path)
            elif filename.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(save_path)
            elif filename.endswith('.json'):
                df = pd.read_json(save_path)
            else:
                return jsonify({"error": "File format not supported"}, 400)
            
            preprocessed_df = data_preprocessing(df, exclude_columns={primary_key, target_variable}, target_column=target_variable)

            os.makedirs(os.path.join(os.getcwd(), 'uploads'), exist_ok=True)
            preprocessed_path = os.path.join(os.getcwd(), 'uploads', 'preprocessed_data.csv')
            metadata_path = os.path.join(os.getcwd(), 'uploads', 'metadata.json')

            preprocessed_df.to_csv(preprocessed_path, index=False)
            metadata = {
                "primary_key": primary_key,
                "target_variable": target_variable,
                "columns": preprocessed_df.columns.tolist(),
                "file_name": filename
            }

            with open(metadata_path, 'w') as f:
                json.dump(metadata, f)

            return jsonify({"message": "File uploaded successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}, 400)
    else:
        return jsonify({"error": "File format not supported"}, 400)
    
