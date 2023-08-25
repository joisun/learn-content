const PENDING = 'pending';
const FULLFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  #state = 'pending';
  #result = undefined;
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULLFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // 私有方法
  #changeState(state, result) {
    if (this.#state !== PENDING) return; //判断状态是否改变过
    this.#state = state;
    this.#result = result;
  }
}
