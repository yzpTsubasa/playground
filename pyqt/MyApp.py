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

        # 工具栏
        toolbar = QToolBar("Tsubasa Toolbar")
        toolbar.setIconSize(QSize(16, 16))
        action = QAction(QIcon("./assets/img/acorn.png"), "Tsubasa Action", self)
        action.setStatusTip("This is Tsubasa Action Button")
        action.triggered.connect(self.onActionTriggered)
        action.setCheckable(True)
        toolbar.addAction(action)

        # 快捷键
        # action.setShortcut(QKeySequence(tr"ctrl+p"))
        # action.setShortcut(QKeySequence(Qt.CTRL + Qt.Key_P))
        action.setShortcut(QKeySequence(QKeySequence.Print))

        toolbar.addSeparator()

        action2 = QAction(QIcon("./assets/img/acorn.png"), "Tsubasa Action2", self)
        action2.setStatusTip("This is Tsubasa Action2 Button")
        action2.triggered.connect(self.onActionTriggered)
        action2.setCheckable(True)
        toolbar.addAction(action2)
        # 添加分割线
        toolbar.addSeparator()

        toolbar.addWidget(QLabel("Hello"))
        checkbox = QCheckBox()
        checkbox.setStatusTip("Try me!!")
        checkbox.toggled.connect(self.onCheckBoxToggled)
        toolbar.addWidget(checkbox)

        toolbar.addSeparator()

        self.addToolBar(toolbar)

        # 状态栏
        self.setStatusBar(QStatusBar(self))

        # 菜单栏
        menu = self.menuBar()
        menu.setNativeMenuBar(False) # 禁用 mac os 的全局菜单

        file_menu = menu.addMenu(u"&文件")
        file_menu.addAction(action)

        file_menu.addSeparator() 
        file_menu.addAction(action2)

        # 子菜单
        file_submenu = file_menu.addMenu(u"&取消")
        file_submenu.addAction(action)
    
    def onCheckBoxToggled(self, checked):
        print("You are " + ("checked" if checked else "unchecked"))

    def onActionTriggered(self, checked):
        print("onActionTriggered", checked)

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
