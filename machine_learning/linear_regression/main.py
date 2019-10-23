'''
数据下载：
https://github.com/imLogM/Machine_Learning_AndrewNg.git

提高python intelligence 速度：settings.json "python.jediEnabled": false

numpy： 科学计算库，处理多维数组，进行数据分析
pandas: 基于 numpy 的一种工具
matplotlib: python的2d绘图库
matplotlib.pyplot: 提供一个类似matlib的绘图库
'''

import numpy as np
import pandas as pd
from matplotlib import pyplot as plt

# pandas.core.frame.DataFrame
data = pd.read_csv('ex1data1.txt', names=['population', 'profit'])
print(data.head())
print(data.tail())
print(data.describe())
print(data.info())

# 向量化的处理中，X会多一项x_0=1的列，但是原始data中是没有的，因此需要手动添加这一列数据
data.insert(0, 'ones', 1)
print(data.head())
# 把X和y分割开来
X = data.iloc[:,0:-1] # X取第1列到最后一列（不取）的所有行
y = data.iloc[:,-1] # y取最后一列的所有行
print("X:")
print(X.head())
print("y:")
print(y.head())
# 以下三种方法都可以把data从DataFrame转换到ndarray
# data.values
# data.as_matrix()
# np.array(data)
X = X.values
y = y.values
# 维度, m为样本数，n为特征数，当前为1
print(X.shape) # (97, 2) 二维 [[x_0^(1), x_1^(1)], [x_0^(2), x_1^(2)],...,[x_0^(m), x_1^(m)]]
print(X) # (m, n+1) 即（97, 2)
print(y.shape) # (97,) 一维 [y^(1), y^(2),...,y^(m)]
print(y) # (m, 1) 即（97, 1)
# theta的维度: (n+1, 1) 即 (2, 1)
y = y.reshape(len(y), 1) # 二维 [[y^(1)], [y^(2)],...,[y^(m)]]
print(y)

# 定义多变量线性回归的代价函数
def costFunction(X, y, theta):
    inner = np.power(X @ theta - y, 2) # 矩阵相乘使用符号 @ 
    return np.sum(inner) / (2 * len(X))
# 定义梯度下降函数
def gradientDescent(X, y, theta, alpha, iters):
    """
    梯度下降函数

    Parameters
    ----------
    X : ndarray
        所有样本的特征数据的数组

    y : ndarray
        所有样本的结果数组

    theta : ndarray
        初始的theta参数数组

    alpha : scalar
        学习速率

    iters : scalar
        迭代次数

    Returns
    -------
    theta : ndarray
        梯度下降后的theta参数数组

    costs : ndarray
        记录代价值的数组
    """
    for i in range(iters):
        costs = []
        theta = theta - (X.T @ (X @ theta - y)) * alpha / len(X)
        # 代价值
        cost = costFunction(X, y, theta)
        costs.append(cost)
        if i % 100 == 0: # 一定间隔后打印代价值
            print('cost: %f' % cost)
    return theta, costs

theta = np.zeros((X.shape[1], y.shape[1]))
print(theta.shape)

alpha = 0.02 # 学习速率
iters = 2000 # 迭代次数

# 初始代价
cost_init = costFunction(X, y, theta)
print(cost_init)

theta, costs = gradientDescent(X, y, theta, alpha, iters)

print(theta)

print('******')
# 绘制散点图，用于观察数据
data.plot.scatter('population', 'profit', c='b', label='population')
plt.show()
