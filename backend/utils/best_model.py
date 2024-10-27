from models.regression import xgbr, linear, rfr, dt
from models.classification import xgbcl, knn, logistic, rfc
from models.cluster import dbscan, gaussianMixture, hierarchical, kmeans, meanShift

BLUE = "\033[94m"
RESET = "\033[0m"


def getBestRegressionModel(processed_df, target_col):
    xgbr_mse = xgbr.xgboost_regression(processed_df, target_col)
    linear_mse = linear.linear_regression(processed_df, target_col)
    rfr_mse = rfr.randomforest_regression(processed_df, target_col)
    dt_mse = dt.decision_tree(processed_df, target_col)

    mse_scores = {
        "XBGR": xgbr_mse,
        "Linear": linear_mse,
        "Rfr": rfr_mse,
        "Decision Tree": dt_mse,
    }

    best_model = min(mse_scores, key=mse_scores.get)
    return best_model, mse_scores


def getBestClassificationModel(processed_df, target_col):
    xgbcl_acc= xgbcl.xgboost_classifier(processed_df, target_col)
    knn_acc= knn.k_nearest_neighbors(processed_df, target_col)
    logistic_acc= logistic.logistic_regression(processed_df, target_col)
    rfc_acc = rfc.random_forest_classifier(processed_df, target_col)

    acc_scores = {
        "XGBCL": xgbcl_acc,
        "KNN": knn_acc,
        "Logistic": logistic_acc,
        "RFC": rfc_acc,
    }

    best_model = max(acc_scores, key=acc_scores.get)
    return best_model, acc_scores


def getBestClusteringModel(processed_df):
    dbscan_sel = dbscan.dbscan_clustering(processed_df)
    gaussianMixture_sel = gaussianMixture.gmm_clustering(processed_df)
    hierarchical_sel = hierarchical.hierarchical_clustering(processed_df)
    kmeans_sel = kmeans.k_means_clustering(processed_df)
    meanShift_sel = meanShift.mean_shift_clustering(processed_df)

    silhouette_avg = {
        "dbscan": dbscan_sel,
        "gaussian": gaussianMixture_sel,
        "hierarchical": hierarchical_sel,
        "kmeans": kmeans_sel,
        "meanShift": meanShift_sel,
    }

    best_model = max(silhouette_avg, key=silhouette_avg.get)
    return best_model, silhouette_avg
