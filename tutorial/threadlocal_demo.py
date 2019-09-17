import threading

thread_local = threading.local()
thread_local2 = threading.local()

def process_student():
    student = thread_local.student
    student2 = thread_local2.student
    print ('Hello %s %s (in %s)' % (student, student2, threading.current_thread().name))

def process_thread(name):
    thread_local.student = name
    thread_local2.student = name
    process_student()

thread1 = threading.Thread(target=process_thread, args=('Alice', ))
thread2 = threading.Thread(target=process_thread, args=('Bruce', ))

thread1.start()
thread2.start()

thread1.join()
thread2.join()