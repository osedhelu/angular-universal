export const _storage = {
    agregar: (name: string, array: object) => {
        localStorage.setItem(name, JSON.stringify(array));
    },
    get: (name: string) => {
        let dataSave: any = localStorage.getItem(name);
        return JSON.parse(dataSave);
    },
    remove: (item: string) => {
        return localStorage.removeItem(item);
    },
};

