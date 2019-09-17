import time, threading

def loop():
    print ('LoopThread %s is running...' % threading.current_thread().name)
    n = 0
    while n < 5:
        n += 1
        print ('LoopThread %s >>> %s' % (threading.current_thread().name, n))
        time.sleep(1)
    print('LoopThread %s ended' % threading.current_thread().name)

print ('MainThread %s is running...' % threading.current_thread().name)
thread = threading.Thread(target=loop, name='LoopThread')
thread.start()
thread.join()
print ('MainThread %s ended.' % threading.current_thread().name)