#!/usr/bin/python3

# Win32
import os # 系统
import re # 正则
import time  # 时间
import json # json
import platform
# OS X
import subprocess

from css_html_js_minify import process_single_html_file, process_single_js_file, process_single_css_file, html_minify, js_minify, css_minify

def openFileSys(path):
    if platform.system() == 'Windows':
        os.startfile(path)
    else:
        subprocess.call(["open", path])

class Main:
    """Class docstrings go here."""
    @staticmethod
    def process(path=None, dst_dir=None, dst_path=None):
        """Class method docstrings go here."""
        cwd = os.getcwd()
        path = path or os.path.join(cwd, 'resource')
        if os.path.isdir(path): # 如果是目录
            for root, dirs, filenames in os.walk(path):
                for i in range(0, len(filenames)):
                    filename = filenames[i]
                    fileshortname, ext = os.path.splitext(filename) # 后缀名
                    fullpath = os.path.join(root, filename) # 完整路径
                    relativepath = os.path.relpath(fullpath, path) # 相对路径
                    # regexp = '\\sgroupName="(\\S+)"'
                    if ext == '.js': # 后缀名为 .js 的文件
                        print(fullpath)
                        process_single_js_file(fullpath, timestamp=False, overwrite=False)
        elif os.path.isfile(path):
            process_single_js_file(path, timestamp=False, overwrite=False)

if __name__ == '__main__':
    Main.process()
