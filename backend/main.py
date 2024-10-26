from flask import Flask
from dotenv import load_dotenv
import os
from routes.data_ingestion import data_ingestion_bp

load_dotenv()

app = Flask(__name__)

app.register_blueprint(data_ingestion_bp)

if __name__ == "__main__":
    app.run(debug=True)
