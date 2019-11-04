'''
偏差和方差 bias and variance
水位变化预测出水量
@date 2019/11/04
'''
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat
from scipy.optimize import minimize

data = loadmat('./ex5data1.mat')
# X, y, Xtest, ytest, Xval, yval
print(data.keys())

# 训练集
X_train, y_train = data['X'], data['y']

# 验证集
X_val, y_val = data['Xval'], data['yval']

# 测试集
X_test, y_test = data['Xtest'], data['ytest']


# 添加偏置项
X_train = np.insert(X_train, 0, values=1, axis=1)
X_val = np.insert(X_val, 0, values=1, axis=1)
X_test = np.insert(X_test, 0, values=1, axis=1)
print(X_train.shape, y_train.shape, X_val.shape, y_val.shape, X_test.shape, y_test.shape)



# 绘制训练样本
def plot_data():
    fig, ax = plt.subplots()
    ax.scatter(X_train[:,1], y_train)
    ax.set(xlabel = 'change in water level(x)',
        ylabel = 'water flowing out og the dam(y)'
    )

# 代价函数
def cost_with_reg(theta, X, y, lamda):
    cost = np.sum(np.power(X @ theta - y.flatten(), 2))
    reg = theta[1:] @ theta[1:] * lamda
    return (cost + reg) / (2 * len(X))

def gradient_with_reg(theta, X, y, lamda):
    grad = (X @ theta - y.flatten()) @ X
    reg = lamda * theta
    reg[0] = 0 # 保证维度不变
    return (grad + reg) / len(X)

theta = np.ones(X_train.shape[1])
lamda = 1
init_cost = cost_with_reg(theta, X_train, y_train, lamda)

def train_model(X, y, lamda):
    theta = np.ones(X.shape[1])
    res = minimize(fun = cost_with_reg,
        x0 = theta,
        args = (X, y, lamda),
        method = 'TNC',
        jac = gradient_with_reg
    )
    return res.x

theta_final = train_model(X_train, y_train, lamda = 0)

print('init_cost %g' % init_cost)


# plt.show()
# 绘制学习曲线
# 任务：训练样本从１开始递增进行训练，比较训练集和验证集上的损失函数变化情况
def plot_learning_curve(X_train, y_train, X_val, y_val, lamda, target = None):
    # 训练样本从1到最大
    x = range(1, len(X_train) + 1)
    train_cost = []
    cv_cost = []
    for i in x:
        theta = train_model(X_train[:i,:], y_train[:i,:], lamda)
        training_cost_i = cost_with_reg(theta, X_train[:i,:], y_train[:i,:], lamda = 0)
        cv_cost_i = cost_with_reg(theta, X_val, y_val, lamda = 0)
        train_cost.append(training_cost_i)
        cv_cost.append(cv_cost_i)
    # np.linspace(1, len(X_train), len(X_train)) 或者 x
    target = target if target else plt
    target.plot(x, train_cost, label = 'training cost')
    target.plot(x, cv_cost, label = 'cross validation cost')
    target.legend()
    plt.xlabel('number of training examples')
    plt.ylabel('cost')
# 简单的线性模型容易造成欠拟合,即高偏差high bias
plot_learning_curve(X_train, y_train, X_val, y_val, lamda)



# 为了处理上面的单一线性模型导致的高偏差问题
# 构造多项式特征，进行多项式回归

def poly_feature(X, power):
    for i in range(2, power + 1):
        X = np.insert(X, X.shape[1], np.power(X[:,1], i), axis = 1)
    return X


def get_means_stds(X):
    # 按照行（特征）取均值和方差
    means = np.mean(X, axis = 0)
    stds = np.std(X, axis = 0)
    return means, stds
# 特征归一
def feature_normalize(X, means, stds):
    # 第一列不做归一化
    X[:,1:] = (X[:,1:] - means[1:]) / stds[1:]
    return X

power = 6

X_train_poly = poly_feature(X_train, power)
X_val_poly = poly_feature(X_val, power)
X_test_poly = poly_feature(X_test, power)

# 训练集、验证集和测试集的特征归一化参数（均值，方差）都是使用的训练集数据
train_means, train_stds = get_means_stds(X_train_poly)

X_train_norm = feature_normalize(X_train_poly, train_means, train_stds)
X_val_norm = feature_normalize(X_val_poly, train_means, train_stds)
X_test_norm = feature_normalize(X_test_poly, train_means, train_stds)

theta_fit = train_model(X_train_norm, y_train, lamda = 0)

def plot_poly_fit():
    # 绘制训练集数据
    plot_data()
    # 单一线性的拟合
    plt.plot(X_train[:,1], X_train @ theta_final)
    # 多项拟合函数
    x = np.linspace(-60, 60, 100)
    xx = x.reshape(100, 1)
    xx = np.insert(xx, 0, 1, axis = 1)
    xx = poly_feature(xx, power)
    xx = feature_normalize(xx, train_means, train_stds)

    plt.plot(x, xx @ theta_fit)

plot_poly_fit()
# plt.show()

# 绘制多项拟合的学习曲线
# 通过调整 lamda 大小，观察学习曲线
# lamda过大会趋于线性，导致欠拟合；过小则导致过拟合，验证集上的代价函数值会远大于训练集
fig, ax = plt.subplots()
plot_learning_curve(X_train_norm, y_train, X_val_norm, y_val, lamda = 0)
# plt.show()

# 通过一系列的lambda值,观察结果，通常以3倍大小递增
lamdas = [0, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10]
training_costs = []
cv_costs = []

# fig, axs = plt.subplots(2, 5)
# ax_index = 0
for lamd in lamdas:
    # 正则化lambda只在训练时使用
    theta = train_model(X_train_norm, y_train, lamda = lamd)
    # ???????????????????????????????????? lamda = 0
    tc = cost_with_reg(theta, X_train_norm, y_train, lamda = 0)
    cv = cost_with_reg(theta, X_val_norm, y_val, lamda = 0)

    training_costs.append(tc)
    cv_costs.append(cv)

    # 绘制学习曲线
    # ax_row = np.math.floor(ax_index / 5)
    # ax_col = ax_index % 5
    # plot_learning_curve(X_train_norm, y_train, X_val_norm, y_val, lamda = lamd, target = axs[ax_row, ax_col])
    # ax_index += 1

fig, ax = plt.subplots()

plt.plot(lamdas, training_costs, label = 'training cost')
plt.plot(lamdas, cv_costs, label = 'validation cost')
plt.legend()


# 观察测试集上的效果
theta = train_model(X_train_norm, y_train, lamda = 3)
test_cost = cost_with_reg(theta, X_test_norm, y_test, lamda = 0)
print(test_cost)

plt.show()


print('end')