import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import data_processing

data = data_processing.load_data()
new_data = data_processing.convert2onehot(data)

# new_data 转换成 float32 的 nparray 的形式

# nparray<uint8>
new_data = new_data.values
# nparray<float32>
new_data = new_data.astype(np.float32)
# 打乱顺序，minimize batch training 表现会更好
np.random.shuffle(new_data)
# 把数据以3:7分成测试集和训练集
sep = int(0.7 * len(new_data))
train_data, test_data = new_data[:sep], new_data[sep:]

# 搭建神经网络
# (数据类型, [样本数（无要求）， 长度（features + labels）])
tf_input = tf.placeholder(tf.float32, [None, new_data.shape[1]], 'input')
# features
tfx = tf_input[:, :21]
# labels
tfy = tf_input[:, 21:]
# 构建tensorflow网络形式
# dense(fully connected) layer 稠密层（全连接层）
# (features, 神经元数量，激活函数， 名称)
# 两层隐藏层
l1 = tf.layers.dense(tfx, 128, tf.nn.relu, name="l1")
l2 = tf.layers.dense(l1, 128, tf.nn.relu, name="l2")
# 一层输出层,不需要激活函数
out = tf.layers.dense(l2, 4, name="l3")
# 按概率的输出 softmax
prediction = tf.nn.softmax(out, name='pred')

loss = tf.losses.softmax_cross_entropy(onehot_labels=tfy, logits=out)
# (acc, update_op)
accuracy = tf.metrics.accuracy(
    labels=tf.argmax(tfy, axis=1),
    predictions = tf.argmax(out, axis=1)
)[1]

opt = tf.train.GradientDescentOptimizer(0.1)
train_op = opt.minimize(loss)

with tf.Session() as sess:
    sess.run(tf.group(tf.global_variables_initializer(), tf.local_variables_initializer()))
    for t in range(4000):
        batch_index = np.random.randint(len(train_data), size=32)
        sess.run(train_op, {tf_input: train_data[batch_index]})
        if t % 50 == 0:
            acc_, pred_, loss_ = sess.run([
                accuracy, prediction, loss
            ], {tf_input: test_data})
            print("Step: %i | Accurate: %.2f | Loss: %.2f" % (t, acc_, loss_))

print('end')