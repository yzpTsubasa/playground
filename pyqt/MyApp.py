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
        x = 3
        # 添加x个按钮
        for n in range(x):
            btn = QPushButton(str(n))
            btn.pressed.connect(lambda x=n: self.my_custom_fn2(x))
            layout.addWidget(btn)

        widget = QWidget()
        widget.setLayout(layout)
        
        subwidget = QWidget()
        sublayout = QHBoxLayout()
        subwidget.setLayout(sublayout)
        layout.addWidget(subwidget)

        # 一系列控件类
        widgets = [
            QCheckBox,
            QSlider,
            QComboBox,
            QListWidget,
            QDateEdit,
            QDateTimeEdit,
            QDial,
            QDoubleSpinBox,
            QFontComboBox,
            QLCDNumber,
            QLabel,
            QLineEdit,
            QProgressBar,
            QPushButton,
            QRadioButton,
            QSpinBox,
            QTimeEdit,
        ]

        for w in widgets:
            sublayout.addWidget(QLabel(w.__name__ + ":"))
            tmpWidget = w()
            if w == QLabel: # 文本
                tmpWidget.setAlignment(Qt.AlignHCenter | Qt.AlignVCenter |Ｑt.AlignCenter)
                tmpWidget.setText("Hello 你好")
                # 设置字体
                font = tmpWidget.font()
                font.setFamily("Microsoft Yahei")
                font.setPointSize(20)
                tmpWidget.setFont(font)
                tmpWidget.setPixmap(QPixmap("./assets/img/acorn.png"))
                # 内容可缩放
                tmpWidget.setScaledContents(True)
            elif w == QCheckBox: # 勾选框
                # 部分选中状态
                tmpWidget.setCheckState(Qt.Checked)
                # 状态改变信号
                tmpWidget.stateChanged.connect(self.onCheckBoxStateChanged)
                # 三种状态
                tmpWidget.setTristate(True)
            elif w == QComboBox: # 下拉框
                tmpWidget.addItems(["No.1", "No.2", "No.3"])
                tmpWidget.currentIndexChanged.connect(self.onComboBoxCurrentIndexChanged)
                tmpWidget.currentIndexChanged[str].connect(self.onComboBoxCurrentTextChanged)
            elif w == QListWidget: # 列表
                tmpWidget.addItems(["No.1", "No.2", "No.3"])
                # 监听选中事件
                tmpWidget.currentItemChanged.connect(self.onListCurrentItemChanged)
                tmpWidget.currentTextChanged.connect(self.onListCurrentTextChanged)
            elif w == QLineEdit:
                # 输入限制
                tmpWidget.setMaxLength(8)
                # 输入提示
                tmpWidget.setPlaceholderText("在此键入你的内容")
                # 仅可查看
                tmpWidget.setReadOnly(False)
                # 监听回车键事件
                tmpWidget.returnPressed.connect(lambda tmpWidget=tmpWidget: self.onLineEditReturnPressed(tmpWidget))
                # 监听文本选中
                tmpWidget.selectionChanged.connect(lambda tmpWidget=tmpWidget: self.onLineEditSelectionChanged(tmpWidget))
                # 监听文本改变
                tmpWidget.textChanged.connect(self.onLineEditTextChanged)
                # 监听文本编辑
                tmpWidget.textEdited.connect(self.onLineEditTextEdited)
            elif w == QSpinBox or w == QSlider or w == QDial:
                # 设置最小值
                tmpWidget.setMinimum(-20)
                # 设置最大值
                tmpWidget.setMaximum(30)
                tmpWidget.setRange(0, 100)
                if w == QSpinBox:
                    # 设置前缀
                    tmpWidget.setPrefix("今日气温")
                    # 设置后缀
                    tmpWidget.setSuffix("摄氏度")
                    # 监听变化值
                    tmpWidget.valueChanged[str]
                elif w == QSlider or w == QDial:
                    tmpWidget.sliderMoved.connect(self.onSliderMoved)
                    tmpWidget.sliderPressed.connect(self.onSliderPressed)
                    tmpWidget.sliderReleased
                    
                # 设置步进值
                tmpWidget.setSingleStep(2)
                # 监听变化值
                tmpWidget.valueChanged
            elif w == QLCDNumber:
                tmpWidget.setDigitCount(10)
                tmpWidget.display(12345678.90)
            else:
                pass
            
            sublayout.addWidget(tmpWidget)

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
    def onSliderPressed(self):
        print("onSliderPressed")
    def onSliderMoved(self, position):
        print("onSliderMoved", position)
    def onLineEditTextEdited(self, text):
        print("输入框内容编辑:", text)
    def onLineEditTextChanged(self, text):
        print("输入框内容改变:", text)
    def onLineEditSelectionChanged(self, widget):
        print("输入框选择内容:", widget.selectedText())
    def onLineEditReturnPressed(self, widget):
        print("输入框按下回车:")
        widget.setText("")
    def onListCurrentItemChanged(self, item):
        print("列表选择对象:", item.text())
    def onListCurrentTextChanged(self, text):
        print("列表选择内容:", text)
    def onComboBoxCurrentIndexChanged(self, index):
        print("下拉框选择索引:", index)
    def onComboBoxCurrentTextChanged(self, text):
        print("下拉框选择内容:", text)
    def onCheckBoxStateChanged(self, state):
        print("勾选框： ", "全部选中" if state == Qt.Checked else "部分选中" if state == Qt.PartiallyChecked else "未选中" if state == Qt.Unchecked else "未知状态")
    
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
