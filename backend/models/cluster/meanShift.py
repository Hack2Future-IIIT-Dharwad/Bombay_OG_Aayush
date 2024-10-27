import pandas as pd
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score
from sklearn.cluster import MeanShift

def mean_shift_clustering(df, bandwidth=None):
    X = pd.get_dummies(df, drop_first=True)

    mean_shift = MeanShift(bandwidth=bandwidth)
    labels = mean_shift.fit_predict(X)
    n_clusters = len(set(labels))

    if n_clusters > 1:
        silhouette_avg = silhouette_score(X, labels)
        davies_bouldin = davies_bouldin_score(X, labels)
        calinski_harabasz = calinski_harabasz_score(X, labels)
    else:
        silhouette_avg = -1
        davies_bouldin = -1
        calinski_harabasz = -1

    return silhouette_avg, davies_bouldin, calinski_harabasz