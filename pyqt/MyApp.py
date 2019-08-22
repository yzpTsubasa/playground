from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *

import sys


class MainWindow(QMainWindow):
    my_signal = pyqtSignal(str)
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        # self.windowTitleChanged.connect(self.onWindowTitleChange)
        self.windowTitleChanged.connect(self.my_custom_fn)
        self.my_signal.connect(self.caught_my_signal)
        # self.windowTitleChanged.connect(lambda x: self.my_custom_fn(x, 10))
        self.setWindowTitle("My App Title")
        label = QLabel("This is awesome")
        label.setAlignment(Qt.AlignCenter)

        layout = QHBoxLayout()
        for n in range(10):
            btn = QPushButton(str(n))
            btn.pressed.connect(lambda x=n: self.my_custom_fn2(x))
            layout.addWidget(btn)
        widget = QWidget()
        widget.setLayout(layout)

        self.setCentralWidget(widget)
    
    def contextMenuEvent(self, e):
        print("Context menu requested!")
        super(MainWindow, self).contextMenuEvent(e)

    def onWindowTitleChange(self, s):
        print("onWindowTitleChange " + s)

    def my_custom_fn(self, a="HELLO", b=5):
        print(a, b)

    def my_custom_fn2(self, a):
        print(a)
        self.my_signal.emit("Clicked" + str(a))
    
    def caught_my_signal(self, str):
        print('caught my signal ' + str)


app = QApplication(sys.argv)
window = MainWindow()
window.show()  # IMPORTANT
app.exec_()
