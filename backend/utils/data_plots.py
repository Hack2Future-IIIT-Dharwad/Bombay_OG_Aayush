import matplotlib.pyplot as plt
import seaborn as sns


def correlation_heatmap(df):
    plt.figure(figsize=(10, 8))
    sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
    plt.title('Correlation Heatmap')
    plt.savefig('static/correlation_heatmap.png')
    plt.close()