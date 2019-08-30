from PyQt5.QtCore import QSize, QUrl, pyqtSignal, Qt
from PyQt5.QtGui import QIcon, QPixmap, QKeySequence
from PyQt5.QtWidgets import QDialog, QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QStatusBar, QMainWindow, QToolBar, QAction, QLabel, QLineEdit, QCheckBox, QSlider, QComboBox, QListWidget, QDateEdit, QDateTimeEdit, QDial, QDoubleSpinBox, QFontComboBox, QLCDNumber, QLabel, QProgressBar, QPushButton, QRadioButton, QSpinBox, QTimeEdit
import sys

class TsubasaDialog(QDialog):
    
    def __init__(self, *args, **kwargs):
        super(TsubasaDialog, self).__init__(*args, **kwargs)
        
        self.setWindowTitle("Tsubasa Dialog")
        self.resize(300, 300)
        # 设置响应按钮
        buttonBox = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        # accept 和 reject 是内置方法
        buttonBox.accepted.connect(self.accept)
        buttonBox.rejected.connect(self.reject)

        # 设置按钮布局
        layout = QVBoxLayout()
        layout.addWidget(buttonBox)
        self.setLayout(layout)



class MainWindow(QMainWindow):
    my_signal = pyqtSignal(str)
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        self.setWindowTitle("My App Title")
        
        # 工具栏
        toolbar = QToolBar("Tsubasa Toolbar")
        toolbar.setIconSize(QSize(16, 16))
        action = QAction(QIcon("./assets/img/acorn.png"), "Tsubasa Action", self)
        action.setStatusTip("This is Tsubasa Action Button")
        action.triggered.connect(self.onActionTriggered)
        action.setCheckable(True)
        toolbar.addAction(action)


        toolbar.addSeparator()

        action2 = QAction(QIcon("./assets/img/acorn.png"), "打开窗口", self)
        action2.setStatusTip("打开一个窗口")
        action2.triggered.connect(self.onActionTriggered2)
        action2.setCheckable(True)
        
        # 快捷键
        # action2.setShortcut(QKeySequence(tr"ctrl+p"))
        # action2.setShortcut(QKeySequence(Qt.CTRL + Qt.Key_P))
        action2.setShortcut(QKeySequence(QKeySequence.Print))

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

        self.resize(500, 400)
    
    def onActionTriggered(self):
        pass

    def onActionTriggered2(self):
        dlg = TsubasaDialog(self)
        result = dlg.exec_()
        if result == QDialog.Accepted:
            print("Dialog accepted")
        else:
            print("Dialog rejected")
            

    def onCheckBoxToggled(self, checked):
        pass


app = QApplication(sys.argv)
window = MainWindow()
window.show()  # IMPORTANT
app.exec_()
