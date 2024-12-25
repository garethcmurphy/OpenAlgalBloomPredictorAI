import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

class AlgalBloomPredictor:
    def __init__(self, data_path):
        """
        Initialize the predictor.

        Parameters:
            data_path (str): Path to the CSV dataset containing water quality and environmental data.
        """
        self.data = pd.read_csv(data_path)
        self.model = None

    def preprocess_data(self):
        """
        Preprocess the dataset: handle missing values, encode categorical variables, and normalize data.
        """
        # Handle missing values
        self.data.fillna(self.data.mean(), inplace=True)

        # Example: Convert categorical data to numeric (if any)
        for col in self.data.select_dtypes(include=['object']).columns:
            self.data[col] = self.data[col].astype('category').cat.codes

        # Split features and labels
        self.X = self.data.drop(columns=['bloom'], axis=1)  # Replace 'bloom' with the target column name
        self.y = self.data['bloom']

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
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
        plt.title('Confusion Matrix')
        plt.xlabel('Predicted')
        plt.ylabel('Actual')
        plt.show()

    def visualize_data(self):
        """
        Generate visualizations to understand the dataset.
        """
        # Pairplot of selected features
        sns.pairplot(self.data, hue='bloom', diag_kind='kde')  # Replace 'bloom' with your target column name
        plt.show()

        # Correlation heatmap
        plt.figure(figsize=(10, 8))
        sns.heatmap(self.data.corr(), annot=True, cmap='coolwarm', fmt='.2f')
        plt.title('Feature Correlation Heatmap')
        plt.show()

    def predict(self, new_data):
        """
        Predict algal blooms for new data.

        Parameters:
            new_data (DataFrame): New data with the same feature columns as the training data.

        Returns:
            Array of predictions.
        """
        return self.model.predict(new_data)

# Example usage
# predictor = AlgalBloomPredictor(data_path='path_to_your_dataset.csv')
# predictor.preprocess_data()
# predictor.visualize_data()
# predictor.train_model()
# predictor.evaluate_model()

# Example new data prediction
# new_data = pd.DataFrame({
#     'feature1': [value1],
#     'feature2': [value2],
#     ...
# })
# predictions = predictor.predict(new_data)
# print("Predictions:", predictions)
