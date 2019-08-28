from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
# from PyQt5.QtWebEngineWidgets import *

import sys


class MainWindow(QMainWindow):
    
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)


        # browser = QWebView()
        # browser.setUrl(QUrl("https://www.bilibili.com/"))

        # self.setCentralWidget(browser)

        
        # mac os 下要先调用这个方法
        self.show()
        self.setWindowTitle("My Browser")
        self.setWindowIcon(QIcon("./assets/img/acorn.png"))


app = QApplication(sys.argv)

app.setApplicationName("Mozarella Ashbadger")
app.setOrganizationName("Mozarella")
app.setOrganizationDomain("mozarella.org")


window = MainWindow()
window.show()

app.exec_()