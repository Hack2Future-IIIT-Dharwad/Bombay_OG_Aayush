import pandas as pd
from sklearn.metrics import silhouette_score
from sklearn.cluster import MeanShift
import numpy as np

def mean_shift_clustering(df, bandwidth=None):
    X = pd.get_dummies(df, drop_first=True)

    mean_shift = MeanShift(bandwidth=bandwidth)

    labels = mean_shift.fit_predict(X)
    n_clusters = len(set(labels))

    if n_clusters > 1:
        silhouette_avg = silhouette_score(X, labels)
    else:
        silhouette_avg = -1 

    return silhouette_avg