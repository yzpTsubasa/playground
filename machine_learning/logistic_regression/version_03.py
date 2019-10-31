'''
逻辑回归-多分类问题
手写数字识别(0,1,...,9)
@date 2019/10/30
'''
from PIL import Image
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.io as sio
from scipy.optimize import minimize

'''
添加 scipy 库：
- 高级的科学计算库，与numpy联系紧密
- 一般都是操控numpy数组来进行科学计算
...
'''



img_w = 20
img_h = 20
# 使用实际图片
num_img = Image.open('number.png')
num_img_data = np.array(num_img)
num_img_data = (1 - num_img_data[:,:,0]/255)
# 需要转置与matlab中的数据匹配
num_img_data = num_img_data.reshape(img_w, img_h).T.flatten()
draw_num_img_data = num_img_data

# 读取 matlab 的数据
data = sio.loadmat('ex3data1.mat')
raw_X = data['X']
raw_y = data['y']
# (5000, 400) 20 * 20 = 400(图片的宽高都为20，即为400个特征)
# (5000, 1)
print(raw_X.shape, raw_y.shape)

# 打印一张图片
def plot_an_image():
    image = draw_num_img_data
    fig, ax = plt.subplots(figsize = (1,1))
    ax.imshow(image.reshape(img_w, img_h).T, cmap = 'gray_r')
    # 不显示刻度
    plt.xticks([])
    plt.yticks([])
    plt.show()

def plot_image(X, num = 100):
    sample_index = np.random.choice(len(X), num)
    # 选择所有sample_index索引的样本特征
    images = X[sample_index,:]
    print(sample_index)
    cols = 10
    rows = np.math.ceil(num / cols)
    fig, ax = plt.subplots(nrows=rows, ncols=cols, figsize=(8,8),sharex=True, sharey=True)
    for r in range(rows):
        for c in range(cols):
            ax[r,c].imshow(images[r * cols + c].reshape(img_w, img_h).T, cmap = 'gray_r')
    # 不显示刻度
    plt.xticks([])
    plt.yticks([])
    plt.show()
    

# sigmoid函数
def sigmoid(z):
    return 1 / (1 + np.exp(-z))
'''
@param lr 学习速率
'''
def costFunction(theta, X, y, lamd):
    m = len(X)
    y_hat = sigmoid(X @ theta)
    j1 = y * np.log(y_hat)
    j2 = (1-y) * (np.log(1 - y_hat))
    # 正则化
    # theta[1:] 为 (28 - 1, 1)
    # reg = np.sum(np.power(theta[1:], 2) * lamd / (2 * m))
    # theta现在为一维数组(28 - 1,)
    reg = theta[1:] @ theta[1:] * lamd / (2 * m)
    return np.sum(j1 + j2) / (-m) + reg

def gradient_reg(theta, X, y, lamd):
    m = len(X)
    # 正则化
    # theta[1:] 为 (28 - 1, 1)
    reg = theta[1:] * (lamd / m)
    # 在0行插入0
    reg = np.insert(reg, 0, values = 0, axis=0)
    y_hat = sigmoid(X @ theta)

    first = (X.T @ (y_hat - y)) / m
    return first + reg


def gradientDescent(X, y, theta, alpha, iters, lamd):
    m = len(X)
    costs = []
    for i in range(iters):
        # 正则化
        # theta[1:] 为 (28 - 1, 1)
        reg = theta[1:] * (lamd / m)
        # 在0行插入0
        reg = np.insert(reg, 0, values = 0, axis=0)

        y_hat = sigmoid(X @ theta)
        theta = theta - X.T @ (y_hat - y) * alpha / m - reg
        
    return theta, costs

# 添加第一列全为1，即添加一个特征
X = np.insert(raw_X, 0, values=1, axis=1)
# 转成1维
y = raw_y.flatten()

'''
使用 minimize
K 标签个数，此处为10
'''
def one_vs_all(X, y, lamd, K):
    # 特征个数 400 + 1
    n = X.shape[1]
    # 所有标签分类器的theta值
    theta_all = np.zeros((K, n))
    # i从1~10代表分类器的标签为(1~0)
    for i in range(1, K + 1):
        theta_i = np.zeros(n,)
        '''
        fun 要优化的函数
        method 优化方法
        jac 梯度向量
        x0 参数初始值 
        '''
        ret = minimize(fun = costFunction,
            x0 = theta_i,
            args = (X, y == i, lamd),
            method = 'TNC',
            jac = gradient_reg
        )
        # 保存最优值
        theta_all[i - 1, :] = ret.x
    
    return theta_all

lamda = 1
K = 10
theta_final = one_vs_all(X, y, lamda, K)
# (10, 401)
# print(theta_final)

# 预测函数，评估结果
def predict(X, theta_final):
    # h 为 (5000, 10) 对5000个样本相对于10个分类器的概率值
    h = sigmoid(X @ theta_final.T)
    # 取最大的概率,对比轴为每一行的所有列，返回的是列的索引(0开始)
    h_argmax = np.argmax(h, axis=1)
    return h_argmax + 1
y_pred = predict(X, theta_final)
acc = np.mean(y_pred == y)
print(acc)

# 测试自制图片
# raw_X[1000]  2
# num_img_data = raw_X[1000]
for i in range(10):
    num_img = Image.open('number_%g.png' % i)
    num_img_data = np.array(num_img)
    num_img_data = (1 - num_img_data[:,:,0]/255)
    # 需要转置与matlab中的数据匹配
    num_img_data = num_img_data.reshape(img_w, img_h).T.flatten()

    num_img_data = np.insert(num_img_data, 0, values=1)
    img_data_h = sigmoid(num_img_data.reshape(1, len(num_img_data)) @ theta_final.T )
    result = (np.argmax(img_data_h, axis=1)[0] + 1) % 10
    print('No.%g img is %g' % (i, result))
    pass


plot_an_image()

# plot_image(raw_X)

print("end")