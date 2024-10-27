import pandas as pd
from sklearn.cluster import DBSCAN
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score
import numpy as np


def dbscan_clustering(df):
    eps = 0.5
    min_samples = 5
    X = pd.get_dummies(df, drop_first=True)

    dbscan = DBSCAN(eps=eps, min_samples=min_samples)
    labels = dbscan.fit_predict(X)

    n_clusters = len(set(labels)) - (1 if -1 in labels else 0)

    if n_clusters > 1:
        silhouette_avg = silhouette_score(X, labels)
        davies_bouldin = davies_bouldin_score(X, labels)
        calinski_harabasz = calinski_harabasz_score(X, labels)
    else:
        silhouette_avg = -1  
        davies_bouldin = -1
        calinski_harabasz = -1

    return silhouette_avg, davies_bouldin, calinski_harabasz