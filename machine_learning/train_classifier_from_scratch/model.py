import numpy as np
import matplotlib.pyplot as plt
import data_processing

data = data_processing.load_data(download=True)
new_data = data_processing.convert2onehot(data)