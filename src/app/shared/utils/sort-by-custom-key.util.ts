export function sortByCustomKey<T>(array: Array<T>, key: keyof T): void {
    array.sort((a: T, b: T) => {
        const valueA = typeof a[key] === 'string' ? (a[key] as unknown as string).toLocaleUpperCase() : a[key];
        const valueB = typeof b[key] === 'string' ? (b[key] as unknown as string).toLocaleUpperCase() : b[key];
        if (valueA < valueB) {
        return -1;
        }
        if (valueA > valueB) {
        return 1;
        }
        return 0;
    });
}
