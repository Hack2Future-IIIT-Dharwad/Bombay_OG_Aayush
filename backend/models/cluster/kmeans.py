import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import numpy as np


def k_means_clustering(df, n_clusters):
    X = pd.get_dummies(df, drop_first=True)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    kmeans.fit(X)
    labels = kmeans.labels_
    inertia = kmeans.inertia_
    silhouette_avg = silhouette_score(X, labels)

    return inertia, silhouette_avg