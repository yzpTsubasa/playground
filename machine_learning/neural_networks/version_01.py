'''
神经网络-多分类问题（使用现成优化参数）
前向传播
手写数字识别(0,1,...,9)
@date 2019/11/01
'''

from PIL import Image
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
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


img_w = 20
img_h = 20
# 使用实际图片
num_img = Image.open('number_0.png')
num_img_data = np.array(num_img)
num_img_data = (1 - num_img_data[:,:,0]/255)
# 需要转置与matlab中的数据匹配
num_img_data = num_img_data.reshape(img_w, img_h).T.flatten()
draw_num_img_data = num_img_data
# 打印一张图片
def plot_an_image():
    image = draw_num_img_data
    fig, ax = plt.subplots(figsize = (1,1))
    ax.imshow(image.reshape(img_w, img_h).T, cmap = 'gray_r')
    # 不显示刻度
    plt.xticks([])
    plt.yticks([])
    plt.show()

# 测试自制图片
# raw_X[1000]  2
# num_img_data = raw_X[1000]
num_img_datas = np.array([]).reshape(0, img_w * img_h)
y_real = np.array([])
for i in range(10):
    num_img = Image.open('number_%g.png' % i)
    num_img_data = np.array(num_img)
    num_img_data = (1 - num_img_data[:,:,0]/255)
    # 需要转置与matlab中的数据匹配
    num_img_data = num_img_data.reshape(img_w, img_h).T.flatten()
    # num_img_data = np.insert(num_img_data, 0, values=1)
    num_img_datas = np.insert(num_img_datas, len(num_img_datas), values=num_img_data, axis=0)
    y_real = np.append(y_real, i)

# 输入层
a1 = num_img_datas
a1 = np.insert(a1, 0, values=1, axis=1) # 添加偏置项 (5000, 401)

z2 = a1 @ theta1.T # (5000, 25)
a2 = sigmoid(z2) # (5000, 25)
a2 = np.insert(a2, 0, values=1, axis=1) # 添加偏置项 (5000, 26)

z3 = a2 @ theta2.T # (5000, 10)
a3 = sigmoid(z3)

h_argmax = np.argmax(a3, axis=1)
y_pred = (h_argmax + 1) % 10
acc = np.mean(y_pred == y_real)
print ('准确率 %g' % acc)
print('end')

plot_an_image()