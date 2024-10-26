import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler, LabelEncoder
from sklearn.decomposition import PCA

def data_preprocessing(df, exclude_columns=None, target_column=None):
    if exclude_columns is None:
        exclude_columns = []

    def min_max_normalization(df, exclude_columns):
        try:
            numeric_cols = df.select_dtypes(include=["number"]).columns.difference(exclude_columns)

            if not numeric_cols.any():
                print("No numeric columns found")
                return df
            
            scaler = MinMaxScaler()
            df[numeric_cols] = scaler.fit_transform(df[numeric_cols])
            return df
        except Exception as e:
            print(f"Error in min_max_normalization: {e}")
            return df

    def manage_null_values(df):
        try:
            numeric_cols = df.select_dtypes(include=["number"]).columns

            if not numeric_cols.any():
                print("No numeric columns found")
                return df
            
            for col in numeric_cols:
                df[col] = df[col].fillna(df[col].mean())

            non_numeric_cols = df.select_dtypes(exclude=["number"]).columns
            for col in non_numeric_cols:
                df[col] = df[col].fillna("Unknown")

            return df
        except Exception as e:
            print(f"Error in manage_null_values: {e}")
            return df
        
    def label_encode_target(df, target_column):
        try:
            if target_column and target_column in df.columns:
                le = LabelEncoder()
                df[target_column] = le.fit_transform(df[target_column])
                print(f"Label encoding applied on {target_column}")
            else:
                print(f"{target_column} not found in columns")
            return df
        except Exception as e:
            print(f"Error in label_encode_target: {e}")
            return df

    def one_hot_encode(df, exclude_columns):
        try:
            categorical_cols = df.select_dtypes(include=["object", "category"]).columns.difference(exclude_columns)
            
            if not categorical_cols.any():
                print("No categorical columns found")
                return df

            df = pd.get_dummies(df, columns=categorical_cols, drop_first=True, dtype=int)
            print("One-hot encoding applied")
            return df
        except Exception as e:
            print(f"Error in one_hot_encode: {e}")
            return df

    try:
        df = manage_null_values(df)
        df = min_max_normalization(df, exclude_columns)
        df = one_hot_encode(df, exclude_columns)
        
        # Apply label encoding if target_column is specified
        if target_column:
            df = label_encode_target(df, target_column)
        
    except Exception as e:
        print(f"Error in data_preprocessing: {e}")

    return df
