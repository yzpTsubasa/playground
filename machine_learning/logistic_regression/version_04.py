'''
神经网络-多分类问题
前向传播
手写数字识别(0,1,...,9)
@date 2019/11/01
'''

import numpy as np
import scipy.io as sio

data = sio.loadmat('ex3data1.mat')
raw_X = data['X']
raw_y = data['y']

# (5000,)
y = raw_y.flatten()
# 权重数据
theta = sio.loadmat('ex3weights.mat')
print(theta.keys())
theta1 = theta['Theta1'] # 输入层至隐藏层的theta (25, 401)
theta2 = theta['Theta2'] # 隐藏层到输出层的theta (10, 26)

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# 输入层
a1 = raw_X
a1 = np.insert(a1, 0, values=1, axis=1) # 添加偏置项 (5000, 401)

z2 = a1 @ theta1.T # (5000, 25)
a2 = sigmoid(z2) # (5000, 25)
a2 = np.insert(a2, 0, values=1, axis=1) # 添加偏置项 (5000, 26)

z3 = a2 @ theta2.T # (5000, 10)
a3 = sigmoid(z3)

# 取最大的概率,对比轴为每一行的所有列，返回的是标签的索引(0开始)
h_argmax = np.argmax(a3, axis=1)
y_pred = h_argmax + 1
acc = np.mean(y_pred == y)
print ('准确率 %g' % acc)
print('end')