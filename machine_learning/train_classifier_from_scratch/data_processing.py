import pandas as pd

from urllib.request import urlretrieve
from urllib.error import URLError

def load_data(download=False):
    data_path = "car.csv"
    try:
        data_path, _ = urlretrieve("http://localhost:8686/E:/tsubasa/python/machine_learning/train_classifier_from_scratch/car.csv", data_path)
        print ("Downloaded to car.csv")
    except URLError as e:
        print(e)
    
    col_names = [
        "buying",
        "maint",
        "doors",
        "persions",
        "lug_boot",
        "safety",
        "condition",
    ]
    data = pd.read_csv(data_path, names = col_names)
    return data




if __name__ == "__main__":
    data = load_data(True)

    print(data.head())
    for name in data.keys():
        print(name, pd.unique(data[name]))