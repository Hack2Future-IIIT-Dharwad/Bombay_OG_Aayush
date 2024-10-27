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

model_bp = Blueprint("model", __name__)

s3_client = boto3.client('s3')
BUCKET_NAME = "darkflow-backend-storage"

@model_bp.route("/get_models", methods=["GET"])
def get_models():
    print("Debug: Fetching available models")
    return jsonify({"message": "Get models"})


@model_bp.route('/train_model', methods=['GET'])
def train_best_model():
    data_key = 'preprocessed_data.csv'
    metadata_key = 'metadata.json'

    try:
        print("Debug: Retrieving preprocessed data from S3")
        data_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=data_key)
        df = pd.read_csv(BytesIO(data_object['Body'].read()))
        print("Debug: Preprocessed data retrieved successfully with columns:", df.columns.tolist())

        print("Debug: Retrieving metadata from S3")
        metadata_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=metadata_key)
        metadata = json.loads(metadata_object['Body'].read())
        print("Debug: Metadata retrieved successfully with metadata:", metadata)

        target_col = metadata.get('target_variable')
        primary_key = metadata.get('primary_key')

        if primary_key:
            print(f"Debug: Dropping primary key column '{primary_key}' from dataframe")
            df.drop(primary_key, axis=1, inplace=True)

        if target_col and target_col in df.columns:
            print(f"Debug: Target column '{target_col}' found. Detecting model type")
            model_type = detect_model(df, target_col)
            print(f"Debug: Detected model type as '{model_type}'")
        else:
            print("Debug: No target column provided or found. Defaulting to clustering model")
            model_type = "Clustering"

        if model_type == "Regression":
            print("Debug: Training best regression model")
            best_model, metrics = getBestRegressionModel(df, target_col)
        elif model_type == "Classification":
            print("Debug: Training best classification model")
            best_model, metrics = getBestClassificationModel(df, target_col)
        elif model_type == "Clustering":
            print("Debug: Training best clustering model")
            best_model, metrics = getBestClusteringModel(df)
        else:
            print("Error: Unable to determine model type")
            return jsonify({"error": "Unable to determine model type"}), 400

        model_data = {
            "model": best_model,
            "metrics": metrics,
            "model_type": model_type
        }
        model_metadata_buffer = json.dumps(model_data).encode('utf-8')

        print("Debug: Saving model metadata to S3")
        try:
            s3_client.put_object(Bucket=BUCKET_NAME, Key='model_metadata/model_data.json', Body=model_metadata_buffer)
            print("Debug: Model metadata saved successfully")
        except Exception as e:
            print(f"Error saving model metadata to S3: {str(e)}")

        return jsonify(
            {"model_type": model_type, "best model": best_model, "metrics": metrics}
        )
    
    except NoCredentialsError:
        print("Error: S3 credentials not available")
        return jsonify({"error": "Credentials not available"}), 403
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 400

@model_bp.route('/modeldata', methods=['GET'])
def get_model_data():
    try:
        # Define the S3 key for the model data
        path = 'model_metadata/model_data.json'
        
        # Retrieve the model data from S3
        model_data_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=path)
        model_data = json.loads(model_data_object['Body'].read())
        
        return jsonify(model_data), 200
    except NoCredentialsError:
        return jsonify({"error": "Credentials not available"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 400