const ExecutionDelay = class {
    #callback;
    #delay;
    #isThrottle;
    #context;
    #args;
    #timeoutId;
    #promise;
    #resolve;
    #fulfilled;
    #isTimeout = false;

    /**
    * @param {function} callback - The function to be executed with a delay.
    * @param {Object} [options={}] - Options as an object for setting parameters.
    * @param {number} [options.delay=1000] - The delay time in milliseconds (default: 1000ms).
    * @param {Object | null} [options.context=null] - The context in which the function will be executed (default: null).
    * @param {boolean} [options.startNow=false] - Initiates execution immediately upon initialization (default: false).
    * @param {boolean} [options.executeNow=false] - Executes the function immediately upon initialization (default: false).
    * @param {boolean} [options.isThrottle=false] - Sets whether function calls are throttled (default: false).
    * @param {boolean} [options.leading=false] - if true the first call will be executed immediately (default: false).
    * @param  {...any} args - Additional arguments to be passed to the function.
    */
    constructor(callback, {
        delay = 1000,
        context = null,
        startNow = false,
        executeNow = false,
        isThrottle = false,
        leading = false
    } = {}, ...args) {
        this.delay = delay;
        this.setContext(context);
        this.isThrottle = isThrottle;
        this.leading = leading;

        if (typeof callback == 'function') {
            this.setFunction(callback, ...args);
            if (executeNow) this.execute();
            if (startNow) this.start();
        }
    }

    get delay() { return this.#delay; }
    set delay(value) {
        if (typeof value !== 'number') { throw new TypeError(`The '${value}' is not 'number'`); }
        this.#delay = value;
    }

    get isThrottle() { return this.#isThrottle; }
    set isThrottle(value) {
        if (typeof value !== 'boolean') { throw new TypeError(`The '${value}' is not 'boolean'`); }
        if (value == false) { this.#args = undefined; }
        this.#isThrottle = value;
    }

    get isStarted() { return this.#isTimeout; }

    getFunction = () => {
        return {
            function: this.#callback,
            arguments: this.#args,
            context: this.#context
        }
    }
    setFunction = (callback, ...args) => {
        if (typeof callback != 'function') { throw new TypeError(`The '${callback}' is not a function.`); }
        this.#callback = callback;
        if (args.length > 0) this.#args = args;
        return {
            start: this.start,
            execute: this.execute,
            setContext: this.setContext
        };
    }

    setArgumetns = (...args) => {
        if (args.length == 0) { return false }
        this.#args = args;
        return {
            start: this.start,
            execute: this.execute
        };
    }

    clearArguments = () => { this.#args = undefined; }

    getContext = () => { return this.#context; }
    setContext = (context) => {
        if (typeof context != 'object' && context != null) {
            throw new TypeError(`The context is '${typeof context}', must be 'object or null.`);
        }
        this.#context = context;
        return {
            start: this.start,
            execute: this.execute
        };
    }

    #createTimeout = () => {
        clearTimeout(this.#timeoutId);
        this.#isTimeout = true;

        this.#timeoutId = setTimeout(() => {
            this.#isTimeout = false;
            this.#promise = null;
            this.#fulfilled = null;

            if (typeof this.#resolve !== 'function') return;

            let result;
            try {
                result = this.#callback.apply(this.#context, this.#args);
            } catch (error) {
                result = error;
            }

            this.#resolve(result);
            this.#resolve = null;

            if (this.#isThrottle) this.#createTimeout();
        }, this.#delay);
    }
    #createPromise = (needTimeout = false) => {
        return this.#promise = new Promise((resolve) => {
            // this.#fulfilled - function for set promise state to fulfilled with stop().
            this.#fulfilled = (message) => { resolve({ causeStops: message }); }
            this.#resolve = resolve;
            if (needTimeout) this.#createTimeout(resolve);
        });
    }
    /**
     * Initiates function execution after the specified delay.
     * @param {...any} args - Optional arguments to be passed to the function.
     * @returns {Promise<Object>} - A promise indicating the completion or an active timer.
     */
    start = (...args) => {
        if (typeof this.#callback != 'function') { throw new Error('The function is missing.'); }
        this.#args = args;

        if (this.#isThrottle === true) {
            if (this.#isTimeout && this.#promise) return this.#promise;
            if (!this.#isTimeout && !this.#promise && this.leading) {
                this.#createTimeout();
                const result = this.#callback.apply(this.#context, this.#args);
                return Promise.resolve(result);
            }
            if (this.#isTimeout && this.#promise === null) {
                return this.#createPromise(false);
            }
        }

        if (this.#isThrottle === false) {
            if (!this.leading && this.#resolve) {
                this.#createTimeout(this.#resolve);
                return this.#promise;
            } else if (this.leading && !this.#resolve && !this.#isTimeout) {
                this.#createTimeout();
                const result = this.#callback.apply(this.#context, this.#args);
                return Promise.resolve(result);
            }
        }

        return this.#createPromise(true);
    }

    /**
     * Executes the function immediately without waiting for the delay.
     * @param {...any} args - Optional arguments to be passed to the function.
     * @returns {any} - The result of the executed function.
     */
    execute = (...args) => {
        this.stop("Execute now!");
        if (typeof this.#callback != 'function') { throw new Error('The function is missing.'); }
        if (args.length > 0) {
            return this.#callback.apply(this.#context, args);
        }
        return this.#callback.apply(this.#context, this.#args);
    }

    /**
     * Stops the execution of the function.
     * @param {string} cause - The cause for stopping the execution.
     */
    stop = (cause = "Forecd stopp.") => {
        clearTimeout(this.#timeoutId);
        this.#isTimeout = false;
        this.#promise = null;
        this.#resolve = null;

        if (typeof this.#fulfilled == 'function') {
            this.#fulfilled(cause);
            this.#fulfilled = undefined;
        }
    }
}

function CustomEvents() {
    const _listMicroTask = new Set();

    let _isMicroTask = false;
    const _microTask = () => {
        try {
            _listMicroTask.forEach(type => {
                this.events.get(type)?.forEach(listener => listener());
            });
        } catch (error) {
            console.warn(error);
        } finally {
            _isMicroTask = false;
            _listMicroTask.clear();
            _promise.resolve();
        }
    }

    this.events = new Map();
    this.on = (type, listener) => {
        if (this.events.get(type) === undefined) {
            this.events.set(type, new Set());
            this.events.get(type).add(listener);
        }
        this.events.get(type).add(listener);
    }

    this.off = (type, listener) => {
        if (this.events.size === 1) {
            this.events.clear();
            return;
        }
        this.events.get(type)?.delete(listener);
    }

    const _promise = { value: undefined, resolve: undefined }
    /** the event will be execute on microtask  */
    this.execute = async (type) => {
        if (_listMicroTask.has(type)) _listMicroTask.delete(type);
        _listMicroTask.add(type);

        if (_isMicroTask) return _promise;
        _isMicroTask = true;
        queueMicrotask(_microTask);
        _promise.value = new Promise(resolve => _promise.resolve = resolve);
        return _promise.value;

    }

    this.has = (type) => { return this.events.has(type); }
}

const customEvents = new CustomEvents();
export { ExecutionDelay, customEvents };