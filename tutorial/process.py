from multiprocessing import Process
import os

def run_proc(name):
    print ("Run child process %s (%s)..." % (name, os.getpid()))

print ("__name__ " + __name__)
if __name__=='__main__':
    print ("Parent process %s." % os.getpid())
    process = Process(target=run_proc, args=('test',))
    print('Child process will start')
    process.start()
    process.join()
    print("Child process end")
print ("__name__ " + __name__)