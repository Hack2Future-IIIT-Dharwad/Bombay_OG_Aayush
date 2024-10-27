from flask import jsonify, Blueprint
from utils.best_model import (
    getBestRegressionModel,
    getBestClassificationModel,
    getBestClusteringModel,
)
from utils.detect_model import detect_model
import pandas as pd
import json
import boto3
from botocore.exceptions import NoCredentialsError
from io import BytesIO
import pickle

model_bp = Blueprint("model", __name__)

s3_client = boto3.client('s3')
BUCKET_NAME = "darkflow-backend-storage"

@model_bp.route("/get_models", methods=["GET"])
def get_models():
    return jsonify({"message": "Get models"})


@model_bp.route('/train_model', methods=['GET'])
def train_best_model():
    data_key = 'preprocessed_data.csv'
    metadata_key = 'metadata.json'

    try:
        # Retrieve preprocessed data from S3
        data_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=data_key)
        df = pd.read_csv(BytesIO(data_object['Body'].read()))

        # Retrieve metadata from S3
        metadata_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=metadata_key)
        metadata = json.loads(metadata_object['Body'].read())

        target_col = metadata.get('target_variable')
        primary_key = metadata.get('primary_key')

        if primary_key:
            df.drop(primary_key, axis=1, inplace=True)

        if target_col and target_col in df.columns:
            model_type = detect_model(df, target_col)
        else:
            model_type = "Clustering"

        # Train and retrieve the best model based on model type
        if model_type == "Regression":
            best_model, metrics = getBestRegressionModel(df, target_col)
            model_directory = 'model_files/regression/'
        elif model_type == "Classification":
            best_model, metrics = getBestClassificationModel(df, target_col)
            model_directory = 'model_files/classification/'
        elif model_type == "Clustering":
            best_model, metrics = getBestClusteringModel(df)
            model_directory = 'model_files/clustering/'
        else:
            return jsonify({"error": "Unable to determine model type"}), 400

        # Save model and metrics to S3
        model_filename = f'{model_type.lower()}_best_model.pkl'
        metrics_filename = f'{model_type.lower()}_metrics.json'

        # Serialize the model and save it to S3
        model_buffer = BytesIO()
        pickle.dump(best_model, model_buffer)
        model_buffer.seek(0)
        s3_client.put_object(
            Bucket=BUCKET_NAME, Key=f'{model_directory}{model_filename}', Body=model_buffer
        )

        # Save metrics to S3
        metrics_buffer = json.dumps(metrics).encode('utf-8')
        s3_client.put_object(
            Bucket=BUCKET_NAME, Key=f'{model_directory}{metrics_filename}', Body=metrics_buffer
        )

        return jsonify(
            {"model_type": model_type, "best_model": model_filename, "metrics": metrics}
        )

    except NoCredentialsError:
        return jsonify({"error": "Credentials not available"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 400
