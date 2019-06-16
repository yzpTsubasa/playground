#!/usr/bin/python3

import sys
import os

import random
import PySide2
from PySide2 import QtCore, QtGui, QtWidgets
from PySide2.QtWidgets import QMainWindow, QApplication, QWidget, QLabel, QFileDialog
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
            path = url.toLocalFile()
            print("Select: " + path)
            self.pathcallback(path)
            
    def pathcallback(self, path):
        self.ui.show_status('执行中...')
        if self.ui.radio_value == 0:
            CheckCode.process(path)
        elif self.ui.radio_value == 1:
            MinifyCode.process(path)
        self.ui.show_status('完成!')
 
if __name__ == '__main__':
    app = QApplication([])
    form = DragFolderWindow()
    form.show()
sys.exit(app.exec_())