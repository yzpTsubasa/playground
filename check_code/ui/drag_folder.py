# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file '.\drag_folder.ui',
# licensing of '.\drag_folder.ui' applies.
#
# Created: Sun May 19 13:07:49 2019
#      by: pyside2-uic  running on PySide2 5.12.3
#
# WARNING! All changes made in this file will be lost!

from PySide2 import QtCore, QtGui, QtWidgets

class Ui_MainWindow(object):
    def on_radio_button_check(self, value):
        print('on_radio_button_check')
        self.radio_value = self.buttonGroup.checkedId()
        

    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(255, 250)
        MainWindow.setAcceptDrops(True)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        # vbox_layout = QtWidgets.QVBoxLayout()
        # self.centralwidget.setLayout(vbox_layout)
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(0, 0, 241, 251))
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

        self.buttonGroup = QtWidgets.QButtonGroup(self.centralwidget)
        self.radio_value = 0
        radio_btn_datas = [
            {'id': 0, 'title': '检查EXML'},
            {'id': 1, 'title': '压缩JS'}
        ]
        for radio_btn_data in radio_btn_datas:
            radio_btn = QtWidgets.QRadioButton(self.centralwidget)
            radio_btn.setText(radio_btn_data['title'])
            # radio_btn.setFixedWidth(100)
            # radio_btn.setFixedHeight(100)
            radio_btn.setGeometry(QtCore.QRect(0, radio_btn_data['id'] * 20, 100, 20))
            radio_btn.setChecked(radio_btn_data['id'] == self.radio_value)
            self.buttonGroup.addButton(radio_btn, radio_btn_data['id'])
        self.buttonGroup.buttonClicked.connect(self.on_radio_button_check)
        # self.buttonGroup.checkedId = self.radio_value

        MainWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QtWidgets.QApplication.translate("MainWindow", "代码检查工具", None, -1))
        self.label.setText(QtWidgets.QApplication.translate("MainWindow", "文件夹拖到此处", None, -1))

