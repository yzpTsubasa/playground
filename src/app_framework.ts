// module app.core {
    // Framework
    
    /**
     * 一般类
     */
    interface IClass<T> {
        new (): T;
    }
    /**
     * 单例管理类
     */
    class InsMgr {
        public static Ins = new InsMgr();
        private guid = 1;
        private clsid2InsMap = {};
        private guidKey = '_cls_guid_asdf_';
        /**
         * 获取指定类cls的单例
         * @param cls 
         */
        public get<T>(cls: IClass<T>): T {
            if (!(cls instanceof Function)) {
                console.error(`InsMgr error: ${cls} is not a constructor`);
                return null;
            }
            let clsid;
            if (cls.hasOwnProperty(this.guidKey)) {
                clsid = cls[this.guidKey];
            } else {
                clsid = cls[this.guidKey] = this.guid++;
            }
            let inst = this.clsid2InsMap[clsid];
            if (!inst) {
                inst = new cls();
                this.clsid2InsMap[clsid] = inst;
            }
            return inst;
        }
        
        ////////// 静态方法
        /**
         * 获取指定类cls的单例
         * @param cls 
         */
        public static get<T>(cls: IClass<T>): T {
            return this.Ins.get(cls);
        }
    }

    class PoolMgr {
        public static Ins = new PoolMgr();
        private guid = 1;
        private clsid2PoolMap: {[id: string]: Array<any>} = {};
        private poolKey = '_pool_asdf_';
        /**
         * 获取指定类的一个实例
         * @param cls 
         */
        public get<T>(cls: IClass<T>): T {
            if (!(cls instanceof Function)) {
                console.error(`PoolMgr error: ${cls} is not a constructor`);
                return null;
            }
            let clsid;
            if (cls.hasOwnProperty(this.poolKey)) {
                clsid = cls[this.poolKey];
            } else {
                clsid = cls[this.poolKey] = this.guid++;
            }
            let pool = this.clsid2PoolMap[clsid];
            if (!pool) {
                pool = [];
                this.clsid2PoolMap[clsid] = pool;
            }
            let inst: T;
            if (pool.length) {
                inst = pool.pop();
            } else {
                inst = new cls();
            }
            return inst;
        }

        /**
         * 回收一个实例
         * @param inst 
         */
        public recycle(inst: any) {
            let cls = inst && inst.constructor;
            if (!cls) {
                console.error(`PoolMgr error: ${inst} has no constructor`);
                return;
            }
            let clsid;
            if (cls.hasOwnProperty(this.poolKey)) {
                clsid = cls[this.poolKey];
            } else {
                clsid = cls[this.poolKey] = this.guid++;
            }
            let pool = this.clsid2PoolMap[clsid];
            if (!pool) {
                pool = [];
                this.clsid2PoolMap[clsid] = pool;
            }
            if (pool.indexOf(inst) != -1) {
                return;
            }
            pool.push(inst);
        }

        //////////// 静态方法
        /**
         * 获取指定类的一个实例
         * @param cls 
         */
        public static get<T>(cls: IClass<T>): T {
            return this.Ins.get(cls);
        }

        /**
         * 回收一个实例
         * @param inst 
         */
        public static recycle(inst: any) {
            return this.Ins.recycle(inst);
        }
    }
    
    
    
    class TreeDataMgr {

        public setTreeData(root, value, ...params): void {
            // 开始嵌套遍历
            var paramLength = params.length;
            var subData = root;
            for (var i = 0; i < paramLength; ++i) {
                var data = subData;
                var key = params[i];
                if (i == paramLength - 1) {
                    subData[key] = value;
                } else {
                    subData = data[key];
                    if (!subData) {
                        subData = {};
                        data[key] = subData;
                    }
                }
            }
        }

        public delTreeData(root, ...params): void {
            // 开始嵌套遍历
            var paramLength = params.length;
            var subData = root;
            for (var i = 0; i < paramLength; ++i) {
                var data = subData;
                var key = params[i];
                if (i == paramLength - 1) {
                    delete subData[key];
                } else {
                    subData = data[key];
                    if (!subData) {
                        break;
                    }
                }
            }
        }
    
        public getTreeData(root, ...params): any {
            // 开始嵌套遍历
            var paramLength = params.length;
            var subData = root;
            for (var i = 0; i < paramLength; ++i) {
                var data = subData;
                var key = params[i];
                subData = data[key];
                if (!subData) {
                    break;
                }
            }
            return subData;
        }
    
        public getTreeDatas(root, ...params): Array<any> {
            var subData = this.getTreeData.apply(this, arguments);
            var result = [];
            result = this.recursiveTreeData(subData);
            return result;
        }
    
        private recursiveTreeData(data): Array<any> {
            var result = [];
            for (var k in data) {
                var v = data[k];
                if (v instanceof Array) {
                    result.push(v);
                } else {
                    result = result.concat(this.recursiveTreeData(v));
                }
            }
            return result;
        }
    }
    
    interface IDataMgr {
        get(key: number): any;
        set(key: number, val: any): boolean;
    }
    
    // 静态数据管理类 
    class StaticDataMgr implements IDataMgr {
        public get(key: number): any {
    
        }
    
        public set(key: number, val: any): boolean {
    
            return true;
        }
    }
    
    
    // 动态数据管理类
    class DynamicDataMgr implements IDataMgr {
    
        public get(key: number): any {
    
        }
    
        public set(key: number, val: any): boolean {
    
            return true;
        }
    }
    
    class EventMgr {
        private handlerDataMap: {[type: string]: Array<{
            type: any,
            handler: Function,
            thisArg: any,
            priority: number,
        }>} = {};

        public emit(type: any, ...datas): void {
            let list = this.handlerDataMap[type];
            if (!list) {
                return;
            }
            list = list.concat();
            list.forEach(handlerData => {
                handlerData.handler && handlerData.handler.apply(handlerData.thisArg, datas);
            });
        }

        public on(type: any, handler: Function, thisArg: any = null, priority: number = 0): void {
            if (type == null || handler == null) {
                return;
            }
            let insertIndex = -1;
            let list = this.handlerDataMap[type];
            if (!list) {
                list = [];
                this.handlerDataMap[type] = list;
            }
            let handlerData = {type: type, handler: handler, thisArg: thisArg, priority: priority};
            for (let i = 0, len = list.length; i < len; ++i) {
                let handlerData = list[i];
                if (!handlerData) {
                    continue;
                }
                if (handlerData.handler == handler && handlerData.type == type && handlerData.thisArg == thisArg) {
                    list.splice(i, 1);
                    len = list.length;
                    --i;
                    continue;
                } else {
                    if (insertIndex == -1 && handlerData.priority < priority) {
                        insertIndex = i;
                    }
                }
            }
            
            if (insertIndex !== -1) {
                list.splice(insertIndex, 0, handlerData);
            }
            else {
                list.push(handlerData);
            }
        }

        public off(type: any, handler: Function, thisArg: any = null): void {
            if (type == null || handler == null) {
                return;
            }
            let list = this.handlerDataMap[type];
            if (!list) {
                return;
            }
            for (let i = 0, len = list.length; i < len; ++i) {
                let handlerData = list[i];
                if (!handlerData) {
                    continue;
                }
                if (handlerData.handler == handler && handlerData.type == type && handlerData.thisArg == thisArg) {
                    list.splice(i, 1);
                    break;
                }
            }
            if (!list.length) {
                delete this.handlerDataMap[type];
            }
        }

        public offAll(thisArg: any): void {
            if (thisArg == null) {
                return;
            }
            for (let type in this.handlerDataMap) {
                let list = this.handlerDataMap[type];
                if (!list) {
                    continue;
                }
                for (let i = 0, len = list.length; i < len; ++i) {
                    let handlerData = list[i];
                    if (!handlerData) {
                        continue;
                    }
                    if (handlerData.thisArg == thisArg) {
                        list.splice(i, 1);
                        len = list.length;
                        --i;
                    }
                }
                if (!list.length) {
                    delete this.handlerDataMap[type];
                }
            }
        }
    }

    class EventMgr2 extends EventMgr {

    }

    class AsyncTest {
        public async getAsync(delay: number = 1000): Promise<string> {
            let promise: Promise<string> = new Promise<string>(resolve => {
                setTimeout(resolve.bind(this, delay + "Resolve"), delay);
            });
            return promise;
        }

        public async run() {
            // let result;
            // for (var i = 0, len = 10; i < len; ++i) {
            //     result = await test.getAsync(1000);
            //     console.log(new Date(), result);
            // }

            let arr = [];
            for (var i = 0, len = 1000; i < len; ++i) {
                arr.push(i);
            }
            let start_timer = Date.now();
            console.log("start_timer", start_timer);
            let curIndex = 0;
            while (curIndex < arr.length) {
                curIndex = await this.processDatas(arr, this.processData, curIndex);
            }
            console.log("cost_timer", Date.now() - start_timer);
            console.warn("Process comleted");
        }

        public processData(data: any) {
            // TODO: Do some thing
            for (var a = 1; a <= 1; ++a) {
                let b = Math.sqrt(a);
                console.log(`第${data}-${a}轮  b`);
            }
        }

        public async processDatas(cfgArr: Array<any>, processFn: Function, index: number = 0): Promise<number> {
            let promise= new Promise<number>(resolve => {
                let start_timer = this.getTimer();
                let max_time = 30;
                for (var i = index, len = cfgArr && cfgArr.length; i < len; ++i) {
                    processFn(cfgArr[i]);
                    if (max_time + start_timer < this.getTimer()) { // 处理超时
                        console.warn("Process timeout");
                        return setTimeout(() => {
                            resolve(i + 1);
                        }, max_time);
                    }
                }
                resolve(i);
            });
            return promise;
        }

        public getTimer(): number {
            // TODO: 使用消耗更少的计时函数
            return Date.now();
        }
    }

    var test = InsMgr.get(AsyncTest);
    test.run();


    
// }