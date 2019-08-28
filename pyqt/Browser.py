from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
# from PyQt5.QtWebEngineWidgets import *

import sys


class MainWindow(QMainWindow):
    
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)

        self.setWindowTitle("My Browser")
        self.setWindowIcon(QIcon("./assets/img/acorn.png"))

        # browser = QWebView()
        # browser.setUrl(QUrl("https://www.bilibili.com/"))

        # self.setCentralWidget(browser)


app = QApplication(sys.argv)

window = MainWindow()
window.show()

app.exec_()