import time, threading, timeit

enable_lock = True
lock = threading.Lock()

balance = 0

def execute_time(fn):
    def wrapper(*args, **kwargs):
        start = timeit.default_timer()
        result = fn(*args, **kwargs)
        end = timeit.default_timer()
        print ("ExecuteTime: %s" % (end - start))
        return result
    return wrapper

def change_it(n):
    global balance
    balance += n
    balance -= n

@execute_time
def run_thread(n):
    for i in range(1000000):
        if enable_lock:
            lock.acquire()
        try:
            change_it(n)
        finally:
            if enable_lock:
                lock.release()

thread1 = threading.Thread(target=run_thread, args=(50,))
thread2 = threading.Thread(target=run_thread, args=(100,))
thread1.start()
thread2.start()
thread1.join()
thread2.join()

print (balance)