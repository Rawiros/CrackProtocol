const createRecursiveProxy = <V extends {}>(obj: V, onSet?: (target: V, prop: string | symbol, value: any) => any) => new Proxy(obj, {
    get(target, prop) {
        if (target[prop] !== null && typeof target[prop] === "object")
            return createRecursiveProxy(target[prop], onSet);

        return target[prop];
    },
    set(target, prop, value) {
        target[prop] = value;

        try {
            onSet(target, prop, value);
        } catch {
            return false;
        } finally {
            return true;
        }
    },
});

export { createRecursiveProxy };
export default createRecursiveProxy