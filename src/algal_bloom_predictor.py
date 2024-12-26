import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split


class AlgalBloomPredictor:
    def __init__(self, data_path):
        """
        Initialize the predictor.

        Parameters:
            data_path (str): Path to the CSV dataset containing water quality and environmental data.
        """
        self.generate_synthetic_data(data_path, 1000)
        self.data = pd.read_csv(data_path)
        self.model = None

    def preprocess_data(self):
        """
        Preprocess the dataset: handle missing values, encode categorical variables, and normalize data.
        """
        # Handle missing values
        self.data.fillna(self.data.mean(), inplace=True)

        # Example: Convert categorical data to numeric (if any)
        for col in self.data.select_dtypes(include=["object"]).columns:
            self.data[col] = self.data[col].astype("category").cat.codes

        # Split features and labels
        self.X = self.data.drop(
            columns=["bloom"], axis=1
        )  # Replace 'bloom' with the target column name
        self.y = self.data["bloom"]

        # Train-test split
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=0.2, random_state=42
        )

    def train_model(self):
        """
        Train a Random Forest model to predict algal blooms.
        """
        self.model = RandomForestClassifier(random_state=42, n_estimators=100)
        self.model.fit(self.X_train, self.y_train)
        print("Model training completed.")

    def evaluate_model(self):
        """
        Evaluate the model using test data.
        """
        y_pred = self.model.predict(self.X_test)

        print("Classification Report:\n", classification_report(self.y_test, y_pred))
        cm = confusion_matrix(self.y_test, y_pred)
        sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
        plt.title("Confusion Matrix")
        plt.xlabel("Predicted")
        plt.ylabel("Actual")
        plt.savefig("confusion_matrix.png")

    def visualize_data(self):
        """
        Generate visualizations to understand the dataset.
        """
        # Pairplot of selected features
        sns.pairplot(
            self.data, hue="bloom", diag_kind="kde"
        )  # Replace 'bloom' with your target column name
        plt.savefig("pairplot.png")
        plt.show()

        # Correlation heatmap
        plt.figure(figsize=(10, 8))
        sns.heatmap(self.data.corr(), annot=True, cmap="coolwarm", fmt=".2f")
        plt.title("Feature Correlation Heatmap")
        plt.savefig("feature_correlation_heatmap.png")

    def predict(self, new_data):
        """
        Predict algal blooms for new data.

        Parameters:
            new_data (DataFrame): New data with the same feature columns as the training data.

        Returns:
            Array of predictions.
        """
        return self.model.predict(new_data)

    @staticmethod
    def generate_synthetic_data(output_path='synthetic_algal_bloom_data.csv', num_samples=1000):
        """
        Generate synthetic data for algal bloom prediction.

        Parameters:
            output_path (str): Path to save the synthetic dataset.
            num_samples (int): Number of synthetic samples to generate.
        """
        np.random.seed(42)

        data = {
            'temperature': np.random.uniform(15, 35, num_samples),
            'pH': np.random.uniform(6.0, 9.0, num_samples),
            'dissolved_oxygen': np.random.uniform(2, 12, num_samples),
            'turbidity': np.random.uniform(0, 100, num_samples),
            'phosphorus': np.random.uniform(0.01, 0.5, num_samples),
            'nitrogen': np.random.uniform(0.1, 5.0, num_samples),
            'rainfall': np.random.uniform(0, 50, num_samples),
            'bloom': np.random.choice([0, 1], num_samples, p=[0.7, 0.3])
        }

        synthetic_data = pd.DataFrame(data)
        synthetic_data.to_csv(output_path, index=False)
        print(f"Synthetic data saved to {output_path}")


# Example usage

predictor = AlgalBloomPredictor(data_path="data/algalbloom.csv")
predictor.preprocess_data()
predictor.visualize_data()
predictor.train_model()
predictor.evaluate_model()

# Example new data prediction
# new_data = pd.DataFrame({
#     'feature1': [value1],
#     'feature2': [value2],
#     ...
# })
# predictions = predictor.predict(new_data)
# print("Predictions:", predictions)
