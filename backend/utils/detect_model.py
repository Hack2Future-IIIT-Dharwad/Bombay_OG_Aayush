import pandas as pd

def detect_model(df, target_col = ''):
    if target_col == '':
        return "Clustering"

    target_data = df[target_col]

    if pd.api.types.is_numeric_dtype(target_data):
        unique_values = target_data.nunique()

        if unique_values <= 10:
            return "Classification"
        else:
            return "Regression"
    else:
        return "Classification"
    