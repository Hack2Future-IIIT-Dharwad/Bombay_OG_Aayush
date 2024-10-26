from flask import Flask, request, jsonify, Blueprint
from models.classification import knn, logistic, rfc, xgbcl
import pandas as pd
import numpy as np

model_bp = Blueprint('model', __name__)

# @model_bp.route('/knn', methods=['POST'])