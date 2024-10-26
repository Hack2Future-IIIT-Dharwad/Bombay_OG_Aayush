import pandas as pd
from sklearn.mixture import GaussianMixture
from sklearn.metrics import silhouette_score
import numpy as np


def gmm_clustering(df, n_components):
    X = pd.get_dummies(df, drop_first=True)

    gmm = GaussianMixture(n_components=n_components, random_state=42)
    gmm.fit(X)
    labels = gmm.predict(X)

    if len(set(labels)) > 1:
        silhouette_avg = silhouette_score(X, labels)
    else:
        silhouette_avg = -1  

    return silhouette_avg