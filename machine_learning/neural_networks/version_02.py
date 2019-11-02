'''
信号是前向传播的,而误差是反向传播的
Back Propagation Neural Network
神经网络-多分类问题（训练并且找到优化参数）
前向传播
手写数字识别(0,1,...,9)
@date 2019/11/01
'''

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.io as sio
from scipy.optimize import minimize

data = sio.loadmat('ex3data1.mat')
raw_X = data['X']
raw_y = data['y']

# 处理 X
X = np.insert(raw_X, 0, values=1, axis=1)
print(X.shape)


'''
对y进行独热(one-hot)编码处理.
原先的逻辑回归中，y值只有0和1两种情况，现在需要表示10种情况
1,2,...,0
[1;0;...;0],[0;1;...;0],...,[0;0;...;1] 
'''

def one_hot_encoder(raw_y):
    result = []
    for i in raw_y:
        y_temp = np.zeros(10)
        y_temp[i-1] = 1
        result.append(y_temp)
    return np.array(result)
# (5000, 10)
y = one_hot_encoder(raw_y)
print(y)

# 加载初始权重参数
theta = sio.loadmat('ex4weights.mat')
theta1, theta2 = theta['Theta1'], theta['Theta2']
print(theta1.shape, theta2.shape)

# 序列化权重参数，scipy需要一维数组(n,)
def serialize(a, b):
    return np.append(a.flatten(), b.flatten())

# 反序列化权重参数
def deserialize(theta_serialized):
    a = theta_serialized[:theta1.size].reshape(theta1.shape)
    b = theta_serialized[theta1.size:].reshape(theta2.shape)
    return a, b

theta_serialized = serialize(theta1, theta2)
print(theta_serialized.shape)
theta_deserialized_1, theta_deserialized_2 = deserialize(theta_serialized)


def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# 前向传播
def feed_forward(theta_serialized, X):
    theta1, theta2 = deserialize(theta_serialized)
    a1 = X
    z2 = a1 @ theta1.T
    a2 = sigmoid(z2)
    a2 = np.insert(a2, 0, values=1, axis=1) # 偏置项
    z3 = a2 @ theta2.T
    h = sigmoid(z3)
    return a1, z2, a2, z3, h

# 代价函数（无正则化）
def cost_without_reg(theta_serialized, X, y):
    a1, z2, a2, z3, h = feed_forward(theta_serialized, X)
    J = -np.sum(y * np.log(h) + (1 - y) * np.log(1 - h)) / len(X)
    return J

cost = cost_without_reg(theta_serialized, X, y)
print(cost)

def cost_with_reg(theta_serialized, X, y, lamd):
    theta1, theta2 = deserialize(theta_serialized)
    sum1 = np.sum(np.power(theta1[:,1:], 2))
    sum2 = np.sum(np.power(theta2[:,1:], 2))
    reg = lamd / (2 * len(X)) * (sum1 + sum2)
    return cost_without_reg(theta_serialized, X, y) + reg

lamd = 1
cost = cost_with_reg(theta_serialized, X, y, lamd)
print(cost)


# 反向传播

# sigmoid的导数
def sigmoid_derivative(z):
    return sigmoid(z) * (1 - sigmoid(z))
# 无正则化的梯度
def gradient_without_reg(theta_serialized, X, y):
    theta1, theta2 = deserialize(theta_serialized)
    a1, z2, a2, z3, h = feed_forward(theta_serialized, X)
    # 误差值（代价）
    d3 = h - y # (K, 1)
    d2 = d3 @ theta2[:,1:] * sigmoid_derivative(z2) # theta值的第一列是用于偏置项的，不参与反向传播计算
    # J对theat2的梯度（求导）
    D2 = (d3.T @ a2) / len(X)
    D1 = (d2.T @ a1) / len(X)
    return serialize(D1, D2)

# 带正则化的梯度
def gradient_with_reg(theta_serialized, X, y, lamd):
    D = gradient_without_reg(theta_serialized, X, y)
    D1, D2 = deserialize(D)
    theta1, theta2 = deserialize(theta_serialized)
    # 第一列不参与正则
    D1[:,1:] = D1[:,1:] + theta1[:,1:] * lamd / len(X)
    D2[:,1:] = D2[:,1:] + theta2[:,1:] * lamd / len(X)
    return serialize(D1, D2)


# 训练函数
def nn_training(X, y, reg, lamd):
    # theta初始值为 -0.5 ~ 0.5 
    init_theta = np.random.uniform(-0.5, 0.5, theta1.size + theta2.size)
    res = minimize(fun = cost_with_reg if reg else cost_without_reg, # 要优化的函数 
        x0=init_theta, # 初始参数
        args= (X, y, lamd) if reg else (X, y),
        method='TNC',
        jac = gradient_with_reg if reg else gradient_without_reg,
        options={'maxiter': 300} # 最大迭代次数
    )
    return res
# 执行训练
reg = True # 是否执行正则，不执行正则，会导致“过拟合”
lamd = 10 # 正则参数
res = nn_training(X, y, reg, lamd)

# 检测训练效果
a1, z2, a2, z3, h = feed_forward(res.x, X)
y_pred = np.argmax(h, axis=1) + 1
actual_y = data['y'].reshape(data['y'].size, )
acc = np.mean(y_pred == actual_y)
print(acc)

# 可视化隐藏层
def plot_hidden_layer(theta):
    theta1, theta2 = deserialize(theta)
    hidden_layer = theta1[:,1:] # (25, 400)

    fig, ax = plt.subplots(ncols = 5, nrows = 5, figsize = (8, 8), sharex=True, sharey=True)

    for row in range(5):
        for col in range(5):
            ax[row, col].imshow(hidden_layer[5 * col + row].reshape(20, 20).T, cmap = 'gray_r')
    
    plt.xticks([])
    plt.yticks([])
    plt.show()

plot_hidden_layer(res.x)

print('end')