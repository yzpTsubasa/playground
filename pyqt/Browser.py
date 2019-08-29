from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
# PyQtWebEngine
from PyQt5.QtWebEngineWidgets import * 

import os
import sys


class MainWindow(QMainWindow):

    homePage = "http://www.baidu.com"
    
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)

        # 浏览器控件
        widget = QWidget()
        layout = QVBoxLayout()
        widget.setLayout(layout)
        browser = self.browser = QWebEngineView(self)
        layout.addWidget(browser)
        self.setCentralWidget(widget)
        # 监听url改变
        browser.urlChanged.connect(self.onUrlChanged)

        # 工具栏
        navtb = QToolBar("Navigation")
        navtb.setIconSize(QSize(16, 16))
        self.addToolBar(navtb)

        actions = [
            {'name': '返回', 'icon': 'assets/img/arrow-180.png', 'handler': self.onNavigationBack, 'tip': 'Previous page'},
            {'name': '前进', 'icon': 'assets/img/arrow.png', 'handler': self.onNavigationForward, 'tip': 'Forward page'},
            {'name': '主页', 'icon': 'assets/img/home.png', 'handler': self.onNavigationHome, 'tip': 'Home page'},
            {'name': '刷新', 'icon': 'assets/img/arrow-circle-315.png', 'handler': self.onNavigationReload, 'tip': 'Reload page'},
            {'name': '停止', 'icon': 'assets/img/control-stop-square.png', 'handler': self.onNavigationStop, 'tip': 'Stop load page'}
        ]

        for index, value in enumerate(actions, 0):
            action = QAction(QIcon(value['icon']), value['name'], self)
            action.setStatusTip(value['tip'])
            action.triggered.connect(value['handler'])
            navtb.addAction(action)

        navtb.addSeparator()

        # https 标识
        httpsicon = self.httpsicon = QLabel()
        navtb.addWidget(httpsicon)
        

        # url输入
        urlbar = self.urlbar = QLineEdit()
        urlbar.returnPressed.connect(self.onUrlBarReturnPressed)
        navtb.addWidget(urlbar)


        
        self.onNavigationHome()

        
        # mac os 下要先调用这个方法
        self.show()
        self.setWindowTitle("My Browser")
        self.setWindowIcon(QIcon("assets/img/acorn.png"))

        self.resize(1080, 600)

    # 焦点移到网页
    def focusInBrowser(self):
        self.browser.setFocus()

    # 重定向至~
    def navigateTo(self, url):
        self.focusInBrowser()
        if url == self.browser.url().toString():
            return
        url = QUrl(url)
        if url.scheme() == '':
            url.setScheme('http')
        self.browser.setUrl(url)

    # URL框回车确认
    def onUrlBarReturnPressed(self):
        self.navigateTo(self.urlbar.text())

    # URL改变了
    def onUrlChanged(self, url):
        self.urlbar.setText(url.toString())
        # url显示最前端
        self.urlbar.setCursorPosition(0)
        self.focusInBrowser()

        # 协议标识
        if url.scheme() == 'https':
            self.httpsicon.setPixmap(QPixmap())
        else:
            self.httpsicon.setPixmap(QPixmap())
            

    def onNavigationStop(self):
        browser = self.browser
        browser.stop()

    def onNavigationReload(self):
        browser = self.browser
        browser.reload()

    def onNavigationForward(self):
        browser = self.browser
        browser.forward()

    def onNavigationHome(self):
        self.navigateTo(self.homePage)

    def onNavigationBack(self):
        browser = self.browser
        browser.back()

app = QApplication(sys.argv)

# app.setApplicationName("Mozarella Ashbadger")
# app.setOrganizationName("Mozarella")
# app.setOrganizationDomain("mozarella.org")


window = MainWindow()
window.show()

app.exec_()