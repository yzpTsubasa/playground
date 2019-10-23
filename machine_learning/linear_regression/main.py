'''
数据下载：
https://github.com/imLogM/Machine_Learning_AndrewNg.git

numpy： 科学计算库，处理多维数组，进行数据分析
pandas: 基于 numpy 的一种工具
matplotlib: python的2d绘图库
matplotlib.pyplot: 提供一个类似matlib的绘图库
'''

import numpy as np
import pandas as pd
from matplotlib import pyplot as plt

data = pd.read_csv('ex1data1.txt', names=['population', 'profit'])
print(data.head())
print(data.tail())
print(data.describe())