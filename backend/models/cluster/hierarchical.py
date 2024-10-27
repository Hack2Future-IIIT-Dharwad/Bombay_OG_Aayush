import pandas as pd
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score

def hierarchical_clustering(df):
    n_clusters = 5
    X = pd.get_dummies(df, drop_first=True)

    hierarchical = AgglomerativeClustering(n_clusters=n_clusters)
    labels = hierarchical.fit_predict(X)

    if len(set(labels)) > 1:
        silhouette_avg = silhouette_score(X, labels)
        davies_bouldin = davies_bouldin_score(X, labels)
        calinski_harabasz = calinski_harabasz_score(X, labels)
    else:
        silhouette_avg = -1  
        davies_bouldin = -1
        calinski_harabasz = -1

    return silhouette_avg, davies_bouldin, calinski_harabasz