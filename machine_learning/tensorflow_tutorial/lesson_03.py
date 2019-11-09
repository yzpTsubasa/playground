import tensorflow as tf
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv('./dataset/Income1.csv')
print (data.head())
plt.scatter(data.Education, data.Income)

plt.show()
