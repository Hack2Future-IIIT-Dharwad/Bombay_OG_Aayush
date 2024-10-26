from flask import Flask
from dotenv import load_dotenv
import os
from routes.data_ingestion import data_ingestion_bp
from routes.models import model_bp
from routes.data_visualization import data_visualization

load_dotenv()

app = Flask(__name__)

app.register_blueprint(data_ingestion_bp)
app.register_blueprint(model_bp)
app.register_blueprint(data_visualization)

if __name__ == "__main__":
    app.run(debug=True)
