import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.decomposition import PCA

def data_preprocessing(df, primary_key, target_variable, exclude_columns=None):
    if exclude_columns is None:
        exclude_columns = []

    def min_max_normalization(df, exclude_columns):
        try:
            numeric_cols = df.select_dtypes(include=["number"]).columns.difference(
                exclude_columns
            )

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

    # def pca_feature_reduction(df, variance_threshold=0.95):
    #     try:
    #         numeric_cols = df.select_dtypes(include=["number"]).columns
    #         x = df[numeric_cols].values

    #         # Standardize the data
    #         scaler = StandardScaler()
    #         X_scaled = scaler.fit_transform(x)

    #         # Apply PCA
    #         pca = PCA()
    #         pca.fit(X_scaled)
    #         explained_variance_ratio = pca.explained_variance_ratio_
    #         cumulative_explained_variance = explained_variance_ratio.cumsum()

    #         # Determine number of components
    #         n_components = (cumulative_explained_variance <= variance_threshold).sum() + 1
    #         pca = PCA(n_components=n_components)
    #         X_pca = pca.fit_transform(X_scaled)
    #         pca_df = pd.DataFrame(X_pca, columns=[f"PC{i+1}" for i in range(n_components)])

    #         return pca_df
    #     except Exception as e:
    #         print(f"Error in pca_feature_reduction: {e}")
    #         return df

    try:
        df = df.drop(columns=[primary_key], errors="ignore")
        df = manage_null_values(df)
        df = min_max_normalization(df, exclude_columns)
        # df = pca_feature_reduction(df)
    except Exception as e:
        print(f"Error in data_preprocessing: {e}")

    return df