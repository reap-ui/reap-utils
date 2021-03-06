import isPlainObject from "./is-plain-object"

export interface Options {
    leading?: boolean
    trailing?: boolean
}

export default (fn: Function, delay: number = 100, options: Options = {}) => {
    if (!isPlainObject(options)) {
        options = {}
    }

    let timer: any = null
    let previous = 0
    const {trailing, leading} = options
    const throttled = (...args: any[]) => {
        const now = Date.now()

        if (!previous && leading === false) {
            previous = now
        }

        const remaining = delay - (now - previous)

        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            previous = now
            fn.apply(null, args)
        } else if (!timer && trailing !== false) {
            timer = setTimeout(
                () => {
                    previous = leading === false ? 0 : Date.now()
                    timer = null
                    fn.apply(null, args)
                },
                remaining
            )
        }
    }

    return throttled
}