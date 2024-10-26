import matplotlib.pyplot as plt


def plot_regression_metrics(mse_scores):
    models = list(mse_scores.keys())
    mse_values = list(mse_scores.values())
    mse_values = [value[0] for value in mse_values]

    print(models)
    print("\n", mse_values)

    # Ensure both lists are of the same length
    if len(models) != len(mse_values):
        raise ValueError("Models and MSE values must have the same length.")

    # Set up the plot with a black background
    plt.figure(figsize=(10, 6), facecolor="black")
    ax = plt.gca()
    ax.set_facecolor("black")

    # Bar plot
    plt.bar(models, mse_values, color="skyblue")
    plt.ylabel("Mean Squared Error (MSE)", color="white")
    plt.title("Regression Model Performance", color="white")

    # Set the color of the axis labels and grid lines
    ax.tick_params(axis="x", colors="white")
    ax.tick_params(axis="y", colors="white")
    ax.xaxis.label.set_color("white")
    ax.yaxis.label.set_color("white")
    ax.title.set_color("white")

    plt.show()


def plot_classification_metrics(acc_scores):
    models = list(acc_scores.keys())
    acc_values = list(acc_scores.values())

    plt.figure(figsize=(10, 6))
    plt.barh(models, acc_values, color="lightgreen")
    plt.xlabel("Accuracy")
    plt.title("Classification Model Performance")
    plt.grid(axis="x")
    plt.show()  # Show the plot window


def plot_clustering_metrics(silhouette_avg):
    models = list(silhouette_avg.keys())
    silhouette_values = list(silhouette_avg.values())

    plt.figure(figsize=(10, 6))
    plt.barh(models, silhouette_values, color="lightcoral")
    plt.xlabel("Silhouette Score")
    plt.title("Clustering Model Performance")
    plt.grid(axis="x")
    plt.show()  # Show the plot window
