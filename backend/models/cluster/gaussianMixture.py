import pandas as pd
from sklearn.mixture import GaussianMixture
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score

def gmm_clustering(df):
    n_components = 5
    X = pd.get_dummies(df, drop_first=True)

    gmm = GaussianMixture(n_components=n_components, random_state=42)
    gmm.fit(X)
    labels = gmm.predict(X)

    if len(set(labels)) > 1:
        silhouette_avg = silhouette_score(X, labels)
        davies_bouldin = davies_bouldin_score(X, labels)
        calinski_harabasz = calinski_harabasz_score(X, labels)
    else:
        silhouette_avg = -1  
        davies_bouldin = -1
        calinski_harabasz = -1

    return silhouette_avg, davies_bouldin, calinski_harabasz