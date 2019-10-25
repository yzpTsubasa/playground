'''
正规方程 Normal Equation 多变量
@date 2019/10/25
'''
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
import math

# 读取数据
data = pd.read_csv('ex1data2.txt', names=['size', 'bedrooms', 'price'])
# print(data.head())

# 添加 x_0 （全为1的列）
data.insert(0, 'ones', 1)
# print(data.head())

# 把X和y分割开来
X = data.iloc[:,0:-1] # X取第1列到最后一列（不取）的所有行
y = data.iloc[:,-1] # y取最后一列的所有行

# 以下三种方法都可以把data从DataFrame转换到ndarray
# data.values
# data.as_matrix()
# np.array(data)
X = X.values
y = y.values


y = y.reshape(len(y), 1) # 二维 [[y^(1)], [y^(2)],...,[y^(m)]]

# print(X[0:5,:])
# print(y[0:5,:])

def normal_equation(X, y):
    theta = np.linalg.inv(X.T @ X) @ X.T @ y
    return theta

theta = normal_equation(X, y)

print(theta)