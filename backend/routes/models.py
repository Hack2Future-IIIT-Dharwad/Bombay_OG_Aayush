from flask import jsonify, Blueprint
from utils.best_model import (
    getBestRegressionModel,
    getBestClassificationModel,
    getBestClusteringModel,
)

# from utils.plot import plot_classification_metrics, plot_clustering_metrics, plot_regression_metrics
from utils.detect_model import detect_model
import pandas as pd
import os
import json
# import model_data from "../"

model_bp = Blueprint("model", __name__)

@model_bp.route("/get_models", methods=["GET"])
def get_models():
    return jsonify({"message": "Get models"})


@model_bp.route('/train_model', methods=['GET'])
def train_best_model():
    data_path = os.path.join(os.path.dirname(__file__), 'uploads', 'preprocessed_data.csv')
    metadata_path = os.path.join(os.path.dirname(__file__), 'uploads', 'metadata.json')

    if not os.path.exists(data_path) or not os.path.exists(metadata_path):
        return jsonify({"error": "Data not found"}, 400)
    
    df = pd.read_csv(data_path)

    with open(metadata_path, 'r') as f:
        metadata = json.load(f)
    
    target_col = metadata.get('target_variable')
    primary_key = metadata.get('primary_key')

    if(primary_key != ''):
        df.drop(primary_key, axis=1, inplace=True)
    
    model_type = detect_model(df, target_col)

    if model_type == "Regression":
        print("regression")
        best_model, metrics = getBestRegressionModel(df, target_col)
        # plot_regression_metrics(metrics)
    elif model_type == "Classification":
        best_model, metrics = getBestClassificationModel(df, target_col)
        # plot_classification_metrics(metrics)
    elif model_type == "Clustering":
        print("yaha")
        best_model, metrics = getBestClusteringModel(df)
        # plot_clustering_metrics(metrics)

    model_metadata = os.path.join(os.path.dirname(__file__), 'model_metadata')
    os.makedirs(model_metadata, exist_ok=True)

    model_data = {
        "model": best_model,
        "metrics": metrics,
        "model_type": model_type
    }

    with open(os.path.join(model_metadata, 'model_data.json'), 'w') as f:
        json.dump(model_data, f)
    
    return jsonify(
        {"model_type": model_type, "best model": best_model, "metrics": metrics}
    )

@model_bp.route('/modeldata', methods=['GET'])
def get_model_data():
    path = os.path.join(os.path.dirname(__file__), "model_metadata", "model_data.json")
    with open(path) as f:
        data = json.load(f)
    return jsonify(data)