#!/usr/bin/python3

import sys

import random

from PySide2 import QtCore, QtGui, QtWidgets
from PySide2.QtWidgets import QMainWindow, QApplication, QWidget, QLabel
# from ui.test import Ui_MainWindow
from ui.drag_folder import Ui_MainWindow
from check_code import Main as CheckCode
from minify_code import Main as MinifyCode

class DragFolderWindow(QMainWindow):
    def __init__(self, parent=None):
        super().__init__()
        self.ui= Ui_MainWindow()
        self.ui.setupUi(self) 
    def dragEnterEvent(self, e):
        if e.mimeData().hasUrls():
            e.acceptProposedAction()

    def dropEvent(self, e):
        for url in e.mimeData().urls():
            file_name = url.toLocalFile()
            print("Select: " + file_name)
            if self.ui.radio_value == 0:
                CheckCode.process(file_name)
            elif self.ui.radio_value == 1:
                MinifyCode.process(file_name)
 
if __name__ == '__main__':
    app = QApplication([])
    form = DragFolderWindow()
    form.show()
sys.exit(app.exec_())