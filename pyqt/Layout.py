from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *

import sys
import random
import math

class Color(QWidget):

    def __init__(self, color, *args, **kwargs):
        super(Color, self).__init__(*args, **kwargs)

        self.setAutoFillBackground(True) # 自动填充背景

        palette = self.palette()
        palette.setColor(QPalette.Window, QColor(color))
        self.setPalette(palette)

class MainWindow(QMainWindow):

    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)

        self.setWindowTitle("Layout")

        # self.testVHLayout()
        # self.testGridLayout()
        # self.testStackedLayout()
        self.testTabWidget()
        
        self.resize(400, 300)

    def testTabWidget(self):
        widget = QTabWidget()
        widget.setDocumentMode(True)
        widget.setTabPosition(QTabWidget.South) #菜单位置
        widget.setMovable(True) # 菜单可移动
        colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]
        # for n in range(num):
        for n, colorValue in enumerate(colors):
            widget.addTab(Color(colorValue), str(colorValue))
        self.setCentralWidget(widget)

    def testStackedLayout(self):

        layout = QVBoxLayout()
        # 如果子布局不主动设置的话,子布局会继承这个值
        layout.setContentsMargins(5, 5, 5, 5) # 布局（与布局容器）的外边距
        layout.setSpacing(5) # 布局中的控件之间的间隔.
        num = 5
        btn_layout = QHBoxLayout()
        stacked_layout = QStackedLayout()
        layout.addLayout(btn_layout)
        layout.addLayout(stacked_layout)
        colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]
        # for n in range(num):
        for n, colorValue in enumerate(colors):
            # colorValue = random.randint(1, 0xffffff)
            btn = QPushButton("%s" % (colorValue))
            btn_layout.addWidget(btn)
            btn.pressed.connect(lambda n=n: stacked_layout.setCurrentIndex(n))
            color = Color(colorValue)
            stacked_layout.addWidget(color)

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)

    def testGridLayout(self):
        layout = QGridLayout()
        # 如果子布局不主动设置的话,子布局会继承这个值
        layout.setContentsMargins(5, 5, 5, 5) # 布局（与布局容器）的外边距
        layout.setSpacing(5) # 布局中的控件之间的间隔.
        num = 30
        col = 7
        for n in range(num):
            color = Color(random.randint(1, 0xffffff))
            index = math.ceil(num / col) * col - n - 1
            layout.addWidget(color, math.floor(index / col), index % col)

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)

    def testVHLayout(self):
        layout = QHBoxLayout()
        # 如果子布局不主动设置的话,子布局会继承这个值
        layout.setContentsMargins(0, 0, 0, 0) # 布局（与布局容器）的外边距
        layout.setSpacing(5) # 布局中的控件之间的间隔.
        for n in range(5):
            if n == 2:
                color = Color(random.randint(1, 0xffffff))
                layout.addWidget(color)
            else:
                sublayout = QVBoxLayout()
                layout.addLayout(sublayout)
                sublayout.setSpacing(0)
                sublayout.setContentsMargins(3, 3, 3, 3)
                for n in range(8):
                    color = Color(random.randint(1, 0xffffff))
                    sublayout.addWidget(color)

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)

app = QApplication(sys.argv)

window = MainWindow()
window.show()

app.exec_()