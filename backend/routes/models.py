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


model_bp = Blueprint("model", __name__)

@model_bp.route("/get_models", methods=["GET"])
def get_models():
    return jsonify({"message": "Get models"})


@model_bp.route('/train_model', methods=['GET'])
def train_best_model():
    data_path = os.path.join(os.getcwd(), 'uploads', 'preprocessed_data.csv')
    metadata_path = os.path.join(os.getcwd(), 'uploads', 'metadata.json')

    if not os.path.exists(data_path) or not os.path.exists(metadata_path):
        return jsonify({"error": "Data not found"}, 400)
    
    df = pd.read_csv(data_path)

    with open(metadata_path, 'r') as f:
        metadata = json.load(f)
    
    target_col = metadata.get('target_variable')
    primary_key = metadata.get('primary_key')

    print("Primary Key: ", primary_key)

    if(primary_key):
        df.drop(primary_key, axis=1, inplace=True)
    
    model_type = detect_model(df, target_col)

    if model_type == "Regression":
        best_model, metrics = getBestRegressionModel(df, target_col)
        # plot_regression_metrics(metrics)
    elif model_type == "Classification":
        best_model, metrics = getBestClassificationModel(df, target_col)
        # plot_classification_metrics(metrics)
    elif model_type == "Clustering":
        best_model, metrics = getBestClusteringModel(df)
        # plot_clustering_metrics(metrics)

    return jsonify(
        {"model_type": model_type, "best model": best_model, "metrics": metrics}
    )
