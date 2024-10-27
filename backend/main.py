from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
import os
from routes.data_ingestion import data_ingestion_bp
from routes.models import model_bp
from routes.data_visualization import data_visualization

load_dotenv()

app = Flask(__name__)

# Explicitly allow localhost:3000 (React frontend)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.register_blueprint(data_ingestion_bp)
app.register_blueprint(model_bp)
app.register_blueprint(data_visualization)

if __name__ == "__main__":
    app.run(debug=True)
