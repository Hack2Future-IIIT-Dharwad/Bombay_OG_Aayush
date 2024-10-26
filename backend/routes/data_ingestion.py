from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
import pandas as pd
import os

data_ingestion_bp = Blueprint('data_ingestion', __name__)

ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@data_ingestion_bp.route('/upload', methods=['POST'])
def upload_dataset():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}, 400)
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file exists"}, 400)
    
    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)

        os.makedirs(os.path.join(os.getcwd(), 'uploads'), exist_ok=True)

        save_path = os.path.join(os.getcwd(), 'uploads', filename)
        file.save(save_path)

        try:
            if file.endswith('.csv'):
                df = pd.read_csv(save_path)
            elif file.endswith('.xlsx') or file.endswith('.xls'):
                df = pd.read_excel(save_path)
            elif file.endswith('.json'):
                df = pd.read_json(save_path)
            else:
                return jsonify({"error": "File format not supported"}, 400)
            
            column_names = df.columns.tolist()
            return jsonify({"columns": column_names}, 200)
        except Exception as e:
            return jsonify({"error": str(e)}, 400)
    else:
        return jsonify({"error": "File format not supported"}, 400)
    
