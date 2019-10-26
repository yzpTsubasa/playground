'''
逻辑回归-线性可分（可以由一条直线切分样本）
根据两门成绩，预测是否可被录取
@date 2019/10/25
'''
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# 读取所有样本数据
data = pd.read_csv('ex2data1.txt', names=['Exam1', 'Exam2', 'Accepted'])

print(data.head())

# 构造数据集(拆分X和y，并且在X前加上值都为1的列)
def get_Xy(data):
    data.insert(0, 'ones', 1)
    X_ = data.iloc[:,0:-1]
    X = X_.values

    y_ = data.iloc[:,-1]
    y = y_.values.reshape(len(y_), 1)
    return X, y

X, y = get_Xy(data)

# sigmoid函数
def sigmoid(z):
    return 1 / (1 + np.exp(-z))
def costFunction(X, y, theta):
    m = len(X)
    y_hat = sigmoid(X @ theta)
    j1 = y * np.log(y_hat)
    j2 = (1-y) * (np.log(1 - y_hat))
    return np.sum(j1 + j2) / (-m)

def gradientDescent(X, y, theta, alpha, iters):
    m = len(X)
    costs = []
    for i in range(iters):
        y_hat = sigmoid(X @ theta)
        theta = theta - X.T @ (y_hat - y) * alpha / m
        if i % 10000 == 0:
            cost = costFunction(X, y, theta)
            costs.append(cost)
            print(cost)
        
    return theta, costs

theta = np.zeros((X.shape[1], y.shape[1]))
cost_init = costFunction(X, y, theta)
print(cost_init)

iters = 200000
alpha = 0.004
theta_final, costs = gradientDescent(X, y, theta, alpha, iters)
print(theta_final)

# 预测函数
def predict(X, theta):
    prob = sigmoid(X @ theta)
    return [1 if x >= 0.5 else 0 for x in prob]

# 检查准确率 accuracy rate,算术平均数
y_ = np.array(predict(X, theta_final))
y_pre = y_.reshape(len(y_), 1)
acc = np.mean(y_pre == y)
print(acc) # 0.91

# 决策边界
# 求两个系数
coef1 = -theta_final[0,0] / theta_final[2, 0]
coef2 = -theta_final[1,0] / theta_final[2, 0]

x = np.linspace(np.min(X[:,1:len(X)]), np.max(X[:,1:len(X)]), 100)
f = coef1 + coef2 * x


# 绘制散点图
fig, ax = plt.subplots()
# 根据条件筛选数据
ax.scatter(data[data['Accepted']==0]['Exam1'], data[data['Accepted']==0]['Exam2'], marker='x', label='y=0(No)')
ax.scatter(data[data['Accepted']==1]['Exam1'], data[data['Accepted']==1]['Exam2'], marker='o', label='y=1(Yes)')
ax.legend()
ax.set(xlabel = 'exam1',
    ylabel = 'exam2',
    title = 'exams vs accepted')

# 绘制决策边界
ax.plot(x, f)

plt.show()