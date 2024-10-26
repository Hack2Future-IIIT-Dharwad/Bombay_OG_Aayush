import pandas as pd
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score

def hierarchical_clustering(df):
    n_clusters = 5
    X = pd.get_dummies(df, drop_first=True)

    hierarchical = AgglomerativeClustering(n_clusters=n_clusters)

    labels = hierarchical.fit_predict(X)

    silhouette_avg = silhouette_score(X, labels)

    return silhouette_avg