from multiprocessing import Pool
import os, time, random

def long_time_task(name):
    print('Run task %s (%s)...' % (name, os.getpid()))
    start = time.time()
    time.sleep(random.random() * 3)
    end = time.time()
    print('Task %s runs %0.2f seconds.' % (name, (end - start)))


print ("__name__ " + __name__)

if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    pool = Pool(4)
    for i in range(5):
        pool.apply_async(long_time_task, args=(i,))
    print('Waiting for all subprocesses done...')
    pool.close()
    pool.join()
    print('All subprocesses done.')