# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file '.\drag_folder.ui',
# licensing of '.\drag_folder.ui' applies.
#
# Created: Sun May 19 13:07:49 2019
#      by: pyside2-uic  running on PySide2 5.12.3
#
# WARNING! All changes made in this file will be lost!

from PySide2 import QtCore, QtGui, QtWidgets
from PySide2.QtWidgets import QFileDialog

from functools import partial

class Ui_MainWindow(object):

    def on_radio_button_check(self, value):
        print('on_radio_button_check')
        self.radio_value = self.buttonGroup.checkedId()

    def on_func_button_click(self, id):
        if id == 0:
            self.show_status('选择文件...')
            paths = QFileDialog.getOpenFileNames(self.MainWindow, 'Open files')[0]
            print(paths)
        elif id == 1:
            self.show_status('选择文件夹...')
            paths = [QFileDialog.getExistingDirectory(self.MainWindow, 'Open folder')]
            print(paths)
        if len(paths) == 0:
            self.show_status('取消选择!')
        for path in paths:
            self.MainWindow.pathcallback(path)

    def setupUi(self, MainWindow):
        self.MainWindow = MainWindow
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(400, 400)
        MainWindow.setAcceptDrops(True)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        # vbox_layout = QtWidgets.QVBoxLayout()
        # self.centralwidget.setLayout(vbox_layout)
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(0, 0, 400, 400))
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Maximum, QtWidgets.QSizePolicy.Maximum)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.label.sizePolicy().hasHeightForWidth())
        self.label.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("Microsoft YaHei")
        font.setPointSize(16)
        self.label.setFont(font)
        self.label.setAcceptDrops(True)
        self.label.setAlignment(QtCore.Qt.AlignCenter)
        self.label.setMargin(0)
        self.label.setObjectName("label")

        self.log = QtWidgets.QLabel(self.centralwidget)
        self.log.setGeometry(QtCore.QRect(0, 50, 100, 20))
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Maximum, QtWidgets.QSizePolicy.Maximum)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.log.sizePolicy().hasHeightForWidth())
        self.log.setSizePolicy(sizePolicy)
        self.label.setAlignment(QtCore.Qt.AlignCenter)
        self.log.setMargin(0)
        font = QtGui.QFont()
        font.setFamily("Microsoft YaHei")
        font.setPointSize(8)
        self.log.setFont(font)
        # self.log.setText('Status...')
        self.show_status('当前无操作...')


        self.buttonGroup = QtWidgets.QButtonGroup(self.centralwidget)
        self.radio_value = 0
        radio_btn_datas = [
            {'id': 0, 'title': '检查EXML'},
            {'id': 1, 'title': '压缩JS'}
        ]
        for radio_btn_data in radio_btn_datas:
            id = radio_btn_data['id']
            radio_btn = QtWidgets.QRadioButton(self.centralwidget)
            radio_btn.setText(radio_btn_data['title'])
            # radio_btn.setFixedWidth(100)
            # radio_btn.setFixedHeight(100)
            radio_btn.setGeometry(QtCore.QRect(0, id * 20, 100, 20))
            radio_btn.setChecked(id == self.radio_value)
            self.buttonGroup.addButton(radio_btn, id)
        self.buttonGroup.buttonClicked.connect(partial(self.on_radio_button_check))
        # self.buttonGroup.checkedId = self.radio_value

        func_btn_datas = [
            {'id': 0, 'title': '选择文件...'},
            {'id': 1, 'title': '选择文件夹...'}
        ]
        for func_btn_data in func_btn_datas:
            id = func_btn_data['id']
            btn = QtWidgets.QPushButton(self.centralwidget)
            btn.setText(func_btn_data['title'])
            # btn.setFixedWidth(100)
            # btn.setFixedHeight(100)
            btn.setGeometry(QtCore.QRect(150, id * 20 + 220, 100, 20))
            # self.buttonGroup.addButton(radio_btn, id)
            btn.clicked.connect(partial(self.on_func_button_click, id))

        MainWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)
    def show_status(self, content):
        self.log.setText(content)
    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QtWidgets.QApplication.translate("MainWindow", "Code Processor", None, -1))
        self.label.setText(QtWidgets.QApplication.translate("MainWindow", "将文件(夹)拖到此处，或者", None, -1))

