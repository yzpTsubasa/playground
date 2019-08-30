from PyQt5.QtCore import QSize, QUrl, Qt, QPropertyAnimation, QEasingCurve, QByteArray, QTimer
from PyQt5.QtGui import QIcon, QPixmap
from PyQt5.QtWidgets import QDialog, QDialogButtonBox, QGraphicsOpacityEffect, QApplication, QWidget, QVBoxLayout, QStatusBar, QMainWindow, QToolBar, QAction, QLabel, QLineEdit, QProgressBar, QFileDialog
# PyQtWebEngine
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtPrintSupport import QPrinter

import os
import sys

class MainWindow(QMainWindow):

    homePage = "https://www.bilibili.com/"
    
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        # 是否正在加载中
        self.isLoading = False

        # 定时器
        self.timerForHide = QTimer()
        self.timerForHide.setInterval(500)
        self.timerForHide.setSingleShot(True)
        self.timerForHide.timeout.connect(self.onTimerForHide)

        # 浏览器控件
        widget = QWidget()
        layout = QVBoxLayout()
        widget.setLayout(layout)
        browser = self.browser = QWebEngineView(self)
        layout.addWidget(browser)
        self.setCentralWidget(widget)
        # 监听url改变
        browser.urlChanged.connect(self.onUrlChanged)
        # 监听页面加载相关
        browser.loadStarted.connect(self.onLoadStarted)
        browser.loadFinished.connect(self.onLoadFinished)
        browser.loadProgress.connect(self.onLoadProgress)
        browser.titleChanged.connect(self.onTitleChanged)
        browser.iconChanged.connect(self.onIconChanged)

        # 工具栏
        navtb = self.navtb = QToolBar("Navigation")
        navtb.setIconSize(QSize(16, 16))
        self.addToolBar(navtb)

        actionsCfg = self.actionsCfg = [
            {'visible': True, 'id': 'back', 'name': '返回', 'icon': 'assets/img/arrow-180.png', 'handler': self.onNavigationBack, 'tip': '返回上一页'},
            {'visible': True, 'id': 'forward', 'name': '前进', 'icon': 'assets/img/arrow.png', 'handler': self.onNavigationForward, 'tip': '前进'},
            {'visible': True, 'id': 'reload', 'name': '刷新', 'icon': 'assets/img/arrow-circle-315.png', 'handler': self.onNavigationReloadOrStop, 'tip': '刷新当前页'},
            {'id': 'stop', 'name': '停止', 'icon': 'assets/img/control-stop-square.png', 'handler': self.onNavigationStop, 'tip': '停止载入'},
            {'visible': True, 'id': 'home', 'name': '主页', 'icon': 'assets/img/home.png', 'handler': self.onNavigationHome, 'tip': 'Home page'},
        ]

        for index, actionCfg in enumerate(actionsCfg, 0):
            if not actionCfg.get('visible'):
                continue
            action = QAction(QIcon(actionCfg.get('icon')), actionCfg.get('name'), self)
            action.setStatusTip(actionCfg.get('tip'))
            action.triggered.connect(actionCfg.get('handler'))
            actionCfg.setdefault('action', action)
            navtb.addAction(action)
        self.reloadAction = self.getNavtbAction("reload")
        # self.stopAction = self.getNavtbAction("stop")

        navtb.addSeparator()

        # https 标识
        httpsicon = self.httpsicon = QLabel()
        navtb.addWidget(httpsicon)
        

        # url输入
        urlbar = self.urlbar = QLineEdit()
        urlbar.returnPressed.connect(self.onUrlBarReturnPressed)
        navtb.addWidget(urlbar)

        # 打印
        self.printer = QPrinter()

        # 菜单栏
        self.menuBar().setNativeMenuBar(False)
        file_menu = self.menuBar().addMenu("&文件")

        open_file_action = QAction(QIcon("assets/img/blue-folder-open-document.png"), "打开...", self)
        open_file_action.setStatusTip("从文件打开")
        open_file_action.triggered.connect(self.onOpenFile)
        file_menu.addAction(open_file_action)

        save_file_action = QAction(QIcon("assets/img/blue-folder-import.png"), "保存...", self)
        save_file_action.setStatusTip("保存")
        save_file_action.triggered.connect(self.onSaveFile)
        file_menu.addAction(save_file_action)
        
        print_action = QAction(QIcon("assets/img/printer.png"), "打印...", self)
        print_action.setStatusTip("打印当前页面")
        print_action.triggered.connect(self.onPrint)
        file_menu.addAction(print_action)

        # 状态栏
        statusBar = self.statusBar = QStatusBar(self)
        self.setStatusBar(statusBar)
        # 加载进度条
        self.loadProBar = QProgressBar(self)
        self.loadProBar.setRange(0, 100)
        self.loadProBar.setTextVisible(True)
        statusBar.addWidget(self.loadProBar)

        # loadProAniFadeIn = self.loadProAniFadeIn = QPropertyAnimation(self.loadProBar)
        # loadProAniFadeIn.setPropertyName(QByteArray.fromRawData("opacity", 7))
        # loadProAniFadeIn.setDuration(100)
        # loadProAniFadeIn.setStartValue(0)
        # loadProAniFadeIn.setEndValue(1)
        # loadProAniFadeIn.setEasingCurve(QEasingCurve.InBack)

        # loadProAniFadeOut = self.loadProAniFadeOut = QPropertyAnimation(self.loadProBar)
        # loadProAniFadeOut.setPropertyName("opacity")
        # loadProAniFadeOut.setDuration(350)
        # loadProAniFadeOut.setStartValue(1)
        # loadProAniFadeIn.setEndValue(0)
        # loadProAniFadeOut.setEasingCurve(QEasingCurve.OutBack)




        # 转到主页
        self.onNavigationHome()

        
        # mac os 下要先调用这个方法
        self.show()
        self.setWindowTitle("My Browser")
        self.setWindowIcon(QIcon("assets/img/acorn.png"))

        self.resize(1080, 600)
    
    def getNavtbAction(self, id):
        cfg = self.getNavtbActionCfg(id)
        return cfg.get('action') if cfg else None
    
    def getNavtbActionCfg(self, id):
        actionsCfg = self.actionsCfg
        for index, value in enumerate(actionsCfg, 0):
            if value['id'] == id:
                return value
        return None

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

    def onPrint(self):
        print("Print")
        dlg = QPrintDialog(self.printer)
        if dlg.exec_():
            self.browser.page().print(self.printer, self.onPrintComplete)
    
    def onOpenFile(self):
        filename, filtername = QFileDialog.getOpenFileName(self, "打开一个网页", "", 
                    "Hypertext Markup Languarge (*.htm *.html);;All files (*.*)"
                    )
        if filename:
            with open(filename, 'r', encoding="utf-8", errors="ignore") as f:
                html = f.read()
            self.browser.setHtml(html)
            self.urlbar.setText(filename)

    def onSaveFile(self):
        filename, filtername = QFileDialog.getSaveFileName(self, "保存网页", "", 
                    "Hypertext Markup Languarge (*.htm *.html);;All files (*.*)"
                    )
        if filename:
            self.browser.page().toHtml(lambda html, filename=filename: self.onBrowserHtmlDone(html, filename))

    def onBrowserHtmlDone(self, html, filename):
        with open(filename, 'w', encoding="utf-8", errors="ignore") as f:
            f.write(html)
        
        dlg = TsubasaDialog("保存成功")

        dlg.exec_()

    def onPrintComplete(self, success):
        print("onPrintComplete ", success)
        pass   # Do something in here, maybe update the status bar?

    # URL框回车确认
    def onUrlBarReturnPressed(self):
        self.navigateTo(self.urlbar.text())

    # URL改变了
    def onUrlChanged(self, url):
        if url.scheme() != 'data':
            self.urlbar.setText(url.toString())
        # url显示最前端
        self.urlbar.setCursorPosition(0)
        self.focusInBrowser()
        # 协议标识
        if url.scheme() == 'https':
            self.httpsicon.setPixmap(QPixmap("assets/img/lock-ssl.png"))
        else:
            self.httpsicon.setPixmap(QPixmap("assets/img/lock.png"))
    
    def onLoadStarted(self):
        self.setIsLoading(True)
    def onLoadFinished(self, ok):
        self.setIsLoading(False)
    def onLoadProgress(self, progress):
        self.loadProBar.setValue(progress)
    def onTitleChanged(self, title):
        self.setWindowTitle(title)
    def onIconChanged(self, icon):
        self.setWindowIcon(icon)
    
    def setIsLoading(self, isLoading):
        if self.isLoading == isLoading:
            return
        self.isLoading = isLoading
        if isLoading:
            self.loadProBar.setValue(0)
            self.loadProBar.setVisible(True)
            self.timerForHide.stop()
            # self.loadProAniFadeIn.start(QPropertyAnimation.DeleteWhenStopped)
        else:
            self.loadProBar.setValue(100)
            self.timerForHide.start()
            # self.loadProAniFadeOut.start(QPropertyAnimation.DeleteWhenStopped)
        actionCfg = self.getNavtbActionCfg('stop' if isLoading else 'reload')
        self.reloadAction.setIcon(QIcon(actionCfg.get('icon')))
        self.reloadAction.setStatusTip(actionCfg.get('tip'))
        self.reloadAction.setText(actionCfg.get('name'))
        self.loadProBar.setFormat("载入中...(%p%)" if isLoading else "已完成(100%)")
    
    def onTimerForHide(self):
        self.loadProBar.setVisible(False)

    def onNavigationReloadOrStop(self):
        if self.isLoading:
            self.onNavigationStop()
        else:
            self.onNavigationReload()

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

class TsubasaDialog(QDialog):
    
    def __init__(self, content, twoBtn = False, *args, **kwargs):
        super(TsubasaDialog, self).__init__(*args, **kwargs)
        
        self.setWindowTitle("Tsubasa Dialog")
        # self.resize(300, 300)
        # 设置响应按钮
        buttonBox = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel if twoBtn else QDialogButtonBox.Ok)
        # accept 和 reject 是内置方法
        buttonBox.accepted.connect(self.accept)
        buttonBox.rejected.connect(self.reject)


        # 设置按钮布局
        layout = QVBoxLayout()
        layout.addWidget(QLabel(content))
        layout.addWidget(buttonBox)
        self.setLayout(layout)

app = QApplication(sys.argv)

# app.setApplicationName("Mozarella Ashbadger")
# app.setOrganizationName("Mozarella")
# app.setOrganizationDomain("mozarella.org")


window = MainWindow()
window.show()

app.exec_()