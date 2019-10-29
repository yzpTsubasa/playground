'''
逻辑回归-线性不可分
芯片是否合格
@date 2019/10/26
'''
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# 读取所有样本数据
data = pd.read_csv('ex2data2.txt', names=['Test 1', 'Test 2', 'Accepted'])
print(data.head())

# 特征映射
'''
@param {int} power 阶次
'''
def feature_mapping(x1, x2, power):
    data = {}
    for i in np.arange(power + 1):
        for j in np.arange(i + 1):
            data['F{}{}'.format(i-j, j)] = np.power(x1, i-j) * np.power(x2, j)
    return pd.DataFrame(data)

x1 = data['Test 1']
x2 = data['Test 2']
power = 6
data2 = feature_mapping(x1, x2, power)
# 28个特征
print(data2.head())

X = data2.values
y = data.iloc[:,-1].values
y = y.reshape(len(y), 1)
print (X.shape, y.shape)

# sigmoid函数
def sigmoid(z):
    return 1 / (1 + np.exp(-z))
'''
@param lr 学习速率
'''
def costFunction(X, y, theta, lr):
    m = len(X)
    y_hat = sigmoid(X @ theta)
    j1 = y * np.log(y_hat)
    j2 = (1-y) * (np.log(1 - y_hat))
    # 正则化
    reg = np.sum(np.power(theta[1:], 2) * lr / (2 * m))

    return np.sum(j1 + j2) / (-m) + reg


theta = np.zeros((X.shape[1], y.shape[1]))
lr = 1
cost_init = costFunction(X, y, theta, lr)
print(cost_init)

fig, ax = plt.subplots()
ax.scatter(data[data['Accepted'] == 0]['Test 1'], data[data['Accepted'] == 0]['Test 2'], marker = 'x', label = 'y=0')
ax.scatter(data[data['Accepted'] == 1]['Test 1'], data[data['Accepted'] == 1]['Test 2'], marker = 'x', label = 'y=0')
ax.legend()
ax.set(xlabel = 'Test 1',
    ylabel = 'Test 2')
plt.show()
