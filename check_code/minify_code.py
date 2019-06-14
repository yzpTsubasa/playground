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
    def process(src_dir=None, dst_dir=None, dst_path=None):
        """Class method docstrings go here."""
        cwd = os.getcwd()
        src_dir = src_dir or os.path.join(cwd, 'resource')
        dst_dir = dst_dir or os.path.expanduser("~/Desktop")
        dst_path = dst_path or os.path.join(dst_dir, 'result.json')

        # time_str = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        # groupNameMap = {
        #     "检查时间": [time_str, "$$"],
        #     # "检查路径": [srcDir, "$$"],
        # }
        # print (json.dumps(groupNameMap, ensure_ascii=False, indent=2))

        for root, dirs, filenames in os.walk(src_dir):
            for i in range(0, len(filenames)):
                filename = filenames[i]
                fileshortname, ext = os.path.splitext(filename) # 后缀名
                fullpath = os.path.join(root, filename) # 完整路径
                relativepath = os.path.relpath(fullpath, src_dir) # 相对路径
                # regexp = '\\sgroupName="(\\S+)"'
                if ext == '.js': # 后缀名为 .js 的文件
                    print(fullpath)
                    process_single_js_file(fullpath, timestamp=False, overwrite=False)

if __name__ == '__main__':
    Main.process()
