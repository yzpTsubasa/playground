import pandas as pd
import os

from urllib.request import urlretrieve
from urllib.error import URLError

def load_data():
    data_path = "car.csv"
    download = not os.path.exists(data_path)
    if download:
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

# 转换数据成one-hot的形式
def convert2onehot(data):
    return pd.get_dummies(data, prefix=data.columns)



if __name__ == "__main__":
    # (m, 7)
    data = load_data()

    print(data.head())
    num_feature = 0
    for name in data.keys():
        # 可能取到的值 pd.unique
        print(name, pd.unique(data[name]))
        num_feature += len(pd.unique(data[name]))
    print('feature number %g' % num_feature)
    # (m, 25)
    newdata = convert2onehot(data)
    # newdata.to_csv('car_onehot_index_true.csv', index=True)
    # newdata.to_csv('car_onehot_index_false.csv', index=False)
    newdata.to_csv('car_onehot.csv', index=False)

    print('end')