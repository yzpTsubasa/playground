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
def costFunction(X, y, theta, lamd):
    m = len(X)
    y_hat = sigmoid(X @ theta)
    j1 = y * np.log(y_hat)
    j2 = (1-y) * (np.log(1 - y_hat))
    # 正则化
    # theta[1:] 为 (28 - 1, 1)
    reg = np.sum(np.power(theta[1:], 2) * lamd / (2 * m))

    return np.sum(j1 + j2) / (-m) + reg

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
        # if i % 10000 == 0:
        #     cost = costFunction(X, y, theta, lr)
        #     costs.append(cost)
        #     print(cost)
        
    return theta, costs


theta = np.zeros((X.shape[1], y.shape[1]))
lamd = 0.001
cost_init = costFunction(X, y, theta, lamd)
print(cost_init)

iters = 200000
alpha = 0.001
theta_final, costs = gradientDescent(X, y, theta, alpha, iters, lamd)
print(theta_final, theta_final.shape)

# 预测函数
def predict(X, theta):
    prob = sigmoid(X @ theta)
    return [1 if x >= 0.5 else 0 for x in prob]

# 检查准确率 accuracy rate,算术平均数
y_ = np.array(predict(X, theta_final))
y_pre = y_.reshape(len(y_), 1)
acc = np.mean(y_pre == y)
print(acc) # 0.91


# 绘制决策边界（等高线）
# 均分200分
x = np.linspace(-1.2, 1.2, 200)
# (200, 200)
xx, yy = np.meshgrid(x, x)
z= feature_mapping(xx.ravel(), yy.ravel(), power).values

zz = z @ theta_final
zz = zz.reshape(xx.shape)


fig, ax = plt.subplots()
ax.scatter(data[data['Accepted'] == 0]['Test 1'], data[data['Accepted'] == 0]['Test 2'], marker = 'x', label = 'y=0')
ax.scatter(data[data['Accepted'] == 1]['Test 1'], data[data['Accepted'] == 1]['Test 2'], marker = 'x', label = 'y=0')
ax.legend()
ax.set(xlabel = 'Test 1',
    ylabel = 'Test 2')

plt.contour(xx, yy, zz, 0)
plt.show()
