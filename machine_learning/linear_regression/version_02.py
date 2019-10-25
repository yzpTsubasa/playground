'''
多变量的线性回归
(房子面积，房间数量，房子价格)
@date 2019/10/24
'''
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
import math

# 读取数据
data = pd.read_csv('ex1data2.txt', names=['size', 'bedrooms', 'price'])
print(data.head())

'''
数据预处理：特征归一化
目标：
- 消除特征值之间的量纲影响，使各特征值处于同一数量级
- 提升模型的收敛速度
- 提升模型的精度
方法：
- 标准正态分布 z = (x_i - mu) / delta  => z in [-1, 1]
- 最大最小化   z = (x_i - min(x_i)) / (max(x_i) - min(x_i))  => z in [0, 1]
'''
# 特征归一化函数
def normalize_feature(data):
    print(data.mean())
    print(data.std())
    return (data - data.mean()) / data.std()

data = normalize_feature(data)
# print(data.head())

# data.plot.scatter('size','price', label = 'size')
# data.plot.scatter('bedrooms','price', label = 'bedrooms')

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

# 多变量线性回归的代价函数
def costFunction(X, y, theta):
    inner = np.power((X @ theta - y), 2)
    return np.sum(inner) / (2 * len(X))

# 定义梯度下降函数
def gradientDescent(X, y, theta, alpha, iters, isPrint = False):
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
    costs = []
    for i in range(iters):
        theta = theta - (X.T @ (X @ theta - y)) * alpha / len(X)
        # 代价值
        cost = costFunction(X, y, theta)
        costs.append(cost)
        if isPrint and i % 100 == 0: # 一定间隔后打印代价值
            print('cost: %f' % cost)
    return theta, costs

theta = np.zeros((X.shape[1], y.shape[1]))

# 测试初始代价，可以不写
cost_init = costFunction(X, y, theta)
# print(cost_init)

# 不同alpha值下的效果
alphas = [0.0003, 0.003, 0.03, 0.0001, 0.001, 0.01]
# 迭代次数
iters = 2000
# 在不同图上显示
# fig_col = 3
# fig_row = math.ceil(len(alphas) / fig_col)
# fig, ax = plt.subplots(fig_row, fig_col)
# for index in range(len(alphas)):
#     alpha = alphas[index]
#     ax_sub = ax if fig_col <= 1 and fig_row <= 1 else ax[index] if fig_col <= 1 or fig_col <= 1 else ax[math.floor(index / fig_col), index % fig_col]
#     theta = np.zeros((X.shape[1], y.shape[1]))
#     # 执行梯度下降算法
#     theta, costs = gradientDescent(X, y, theta, alpha, iters)
#     # 绘制梯度下降结果
#     ax_sub.plot(np.arange(iters), costs)
#     ax_sub.set(xlabel='iters',
#         ylabel = 'costs',
#         title = 'iters vs costs (alpha=%.6g)' % alpha)
# 在同一张图上显示
fig, ax = plt.subplots()
for index in range(len(alphas)):
    alpha = alphas[index]
    ax_sub = ax
    theta = np.zeros((X.shape[1], y.shape[1]))
    # 执行梯度下降算法
    theta, costs = gradientDescent(X, y, theta, alpha, iters)
    print(theta)
    # 绘制梯度下降结果
    ax_sub.plot(np.arange(iters), costs, label = 'alpha=%.6g' % alpha)
    ax_sub.set(xlabel='iters',
        ylabel = 'costs',
        title = 'iters vs cost')
    # 显示图例
    ax_sub.legend()

plt.show()