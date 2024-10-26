from flask import jsonify, Blueprint
from models.classification import xgbcl, knn, logistic, rfc
from models.regression import xgbr, linear, rfr, dt
from models.cluster import dbscan, gaussianMixture, hierarchical, kmeans, meanShift
from utils.best_model import getBestRegressionModel, getBestClassificationModel, getBestClusteringModel
from utils.detect_model import detect_model
import pandas as pd


model_bp = Blueprint('model', __name__)

@model_bp.route('/get_models', methods = ['GET'])
def get_models():
    return jsonify({"message" : "Get models"})

@model_bp.route('/train_model', methods=['POST'])
def train_best_model():
    df = pd.read_csv("backend/dataset/test.csv")
    df.columns = [col.strip().replace(' ', '_').replace('[', '').replace(']', '').replace('<', '').replace('>', '') for col in df.columns]

    target_col = None
    if 'target' in df.columns.tolist():
        target_col = 'target'
    
    model_type = detect_model(df, target_col)

    if model_type == "Regression":
        best_model, metrics = getBestRegressionModel(df, target_col)
    elif model_type == "Classification":
        best_model, metrics = getBestClassificationModel(df, target_col)
    elif model_type == "Clustering":
        best_model, metrics = getBestClusteringModel(df)

    return jsonify({"best model" : best_model, "metrics" : metrics})