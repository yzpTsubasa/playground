import os
import shutil

class Main:
    """Class docstrings go here."""
    @staticmethod
    def process(src=None, dst=None):
        print ("copy process")
        src = src or 'src'
        dst = dst or 'dst'
        Main.copytree(src, dst)
    
    @staticmethod
    def copytree(src, dst, symlinks=False):
        if not os.path.isdir(src):
            return
        names = os.listdir(src)
        if not os.path.isdir(dst):
           os.makedirs(dst)
        errors = []
        for name in names:
            srcname = os.path.join(src, name)
            dstname = os.path.join(dst, name)
            try:
                if symlinks and os.path.islink(srcname):
                    linkto = os.readlink(srcname)
                    os.symlink(linkto, dstname)
                elif os.path.isdir(srcname):
                    shutil.copytree(srcname, dstname, symlinks)
                else:
                    shutil.copy2(srcname, dstname)
                # XXX What about devices, sockets etc.?
            except OSError as why:
                errors.append((srcname, dstname, str(why)))
            # catch the Error from the recursive copytree so that we can
            # continue with other files
            except Error as err:
                errors.extend(err.args[0])
        try:
            shutil.copystat(src, dst)
        except OSError as why:
            # can't copy file access times on Windows
            if why.winerror is None:
                errors.extend((src, dst, str(why)))
        if errors:
            raise Error(errors)

if __name__ == '__main__':
    Main.process()