from flask import jsonify, Blueprint
import os
import pandas as pd
import json


data_visualization = Blueprint("data_viz", __name__)


@data_visualization.route("/get_data_json", methods=["GET"])
def get_data_viz():
    metadata_path = os.path.join(os.getcwd(), 'uploads', 'metadata.json')
    
    with open(metadata_path, 'r') as f:
        metadata = json.load(f)

    filename = metadata.get("file_name")
    unprocessed_data_path = os.path.join(os.getcwd(), "uploads", filename)
    
    if filename.endswith('.csv'):
        df = pd.read_csv(unprocessed_data_path, encoding='ISO-8859-1')  # Adjust the encoding if necessary
    elif filename.endswith(('.xlsx', '.xls')):
        df = pd.read_excel(unprocessed_data_path)  # Use read_excel for Excel files
    else:
        return jsonify({"error": "Unsupported file format"}), 400
        
    data = df.to_dict(orient='list')
    
    return jsonify(data)
