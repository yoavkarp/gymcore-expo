export const removeTypename: <T>(obj: T) => Omit<T, '__typename'> = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(removeTypename);
    }

    const newObj: any = {};
    for (let key in obj) {
        if (key !== '__typename') {
            newObj[key] = removeTypename(obj[key]);
        }
    }

    return newObj;
}

export const removeUndefined: <T>(obj: T) => Exclude<T, undefined> = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(removeUndefined);
    }

    const newObj: any = {};
    for (let key in obj) {
        if (obj[key] !== undefined) {
            newObj[key] = removeUndefined(obj[key]);
        }
    }

    return newObj;
}