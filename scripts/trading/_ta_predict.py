import csv
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR

path = r"C:\Users\admin\PycharmProjects\potykion.github.io\scripts\trading\ta_1h.csv"
train_path = r"C:\Users\admin\PycharmProjects\potykion.github.io\scripts\trading\ta_1h_train.csv"
predict_path = r"C:\Users\admin\PycharmProjects\potykion.github.io\scripts\trading\ta_1h_predict.csv"


with open(path, "r") as f:
    reader = csv.reader(f)
    headers = next(reader)
    rows = list(reader)

    rows_for_training = [row for row in rows if len(row) == 93]
    rows_to_predict = [row for row in rows if len(row) < 93]

with open(train_path, "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows_for_training)

with open(predict_path, "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows_to_predict)


df = pd.read_csv(train_path)
X = df.iloc[:, 1:-1]
y = df.iloc[:, -1]
X_train, X_test_train, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
df_to_predict = pd.read_csv(predict_path)

models = [
    LinearRegression(),
    RandomForestRegressor(n_estimators=100, random_state=42),
    SVR(C=1.0, epsilon=0.2),
]
for index, model in enumerate(models):
    model.fit(X_train, y_train)

    predictions = model.predict(X_test_train)
    mse = mean_squared_error(y_test, predictions)
    print(f"Mean Squared Error: {mse}")

    X_test = df_to_predict.iloc[:, 1 : -(1 + index)]
    predictions = model.predict(X_test)
    df_to_predict[f"Prediction_{model.__class__.__name__}"] = predictions

predict_cols = [f"Prediction_{model.__class__.__name__}" for model in models]
df_to_predict = df_to_predict[["Ticker", 'volume', *predict_cols]]
df_to_predict.to_csv(predict_path, index=False)
