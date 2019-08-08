#!/usr/bin/python3

# Win32
import os # 系统
import re # 正则
import time  # 时间
import json # json
import platform
# OS X
import subprocess

def openFileSys(path):
    if platform.system() == 'Windows':
        os.startfile(path)
    else:
        subprocess.call(["open", path])

class Main:
    @staticmethod
    def process(srcDir = None, dstDir = None, dstPath = None):
        cwd = os.getcwd()
        srcDir = srcDir or os.path.join(cwd, 'resource')
        dstDir = dstDir or os.path.expanduser("~/Desktop")
        dstPath = dstPath or os.path.join(dstDir, 'result.json')

        time_str = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        groupNameMap = {
            "检查时间": [time_str, "$$"],
            # "检查路径": [srcDir, "$$"],
        }
        print (json.dumps(groupNameMap, ensure_ascii=False, indent=2))

        for root, dirs, filenames in os.walk(srcDir):
            for i in range(0, len(filenames)):
                filename = filenames[i]
                fileshortname, ext = os.path.splitext(filename) # 后缀名
                fullpath = os.path.join(root, filename) # 完整路径
                relativepath = os.path.relpath(fullpath, srcDir) # 相对路径
                regexp = '\\sgroupName="(\\S+)"'
                if ext == '.exml': # 后缀名为 .exml 的文件
                    print(fullpath)
                    with open(fullpath, 'r', encoding='utf-8', errors='ignore') as file:
                        filecontent = file.read()
                        matches = re.findall(regexp, filecontent)
                        for m in range(0, len(matches)):
                            match = matches[m]
                            if not match in groupNameMap:
                                matchArr = []
                                groupNameMap[match] = matchArr
                            else:
                                matchArr = groupNameMap[match]
                            if not relativepath in matchArr: 
                                matchArr.append(relativepath)
        # 字典dict不能在遍历时修改
        # for key in groupNameMap:
        #     groupNames = groupNameMap[key]
        #     if len(groupNames) == 1:
        #         del groupNameMap[key]
        for key in list(groupNameMap.keys()):
            groupNames = groupNameMap[key]
            if len(groupNames) == 1:
                del groupNameMap[key]
        # 把结果写入指定文件
        with open(dstPath, 'w', encoding='utf-8') as file:
            json.dump(groupNameMap, file, indent=4, ensure_ascii=False)
        openFileSys(dstDir)
        openFileSys(dstPath)

if __name__ == '__main__':
    Main.process()
