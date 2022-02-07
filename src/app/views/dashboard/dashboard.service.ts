import { Injectable } from '@angular/core';

export class ArchitectureInfo {
    mes: string;

    pack1: number;

    pack2: number;

    pack3: number;

    pack4: number;
}
export class DataItem {
    country: string;
    commodity: string;
    total: number;
    itotal: number
}
const data: DataItem[] = [
    { country: 'PACK 1', commodity: 'Available', total: 99.3, itotal: 1000 },
    { country: 'PACK 1', commodity: 'Sold', total: 0.7, itotal: 1000 },
    { country: 'PACK 2', commodity: 'Available', total: 99, itotal: 500 },
    { country: 'PACK 2', commodity: 'Sold', total: 1, itotal: 500 },
    { country: 'PACK 3', commodity: 'Available', total: 99.6, itotal: 250 },
    { country: 'PACK 3', commodity: 'Sold', total: 0.4, itotal: 250 },

];

const cache = {};

const architecturesInfo: ArchitectureInfo[] = [{
    mes: 'enero',
    pack1: 55,
    pack2: 226,
    pack3: 1000,
    pack4: 1,
}, {
    mes: 'febrero',
    pack1: 0,
    pack2: 0,
    pack3: 0,
    pack4: 0,
}, {
    mes: 'marzo',
    pack1: 0,
    pack2: 0,
    pack3: 0,
    pack4: 0,
}, {
    mes: 'abril',
    pack1: 0,
    pack2: 0,
    pack3: 0,
    pack4: 0,
}, {
    mes: 'mayo',
    pack1: 0,
    pack2: 0,
    pack3: 0,
    pack4: 0,
}, {
    mes: 'junio',
    pack1: 0,
    pack2: 0,
    pack3: 0,
    pack4: 0,
},
];

@Injectable()
export class DashboardService {
    getArchitecturesInfo(): ArchitectureInfo[] {
        return architecturesInfo;
    }
    getData(country?: string): DataItem[] {
        if (country) {
            return cache[country] = cache[country] || data.filter((item) => item.country === country);
        }
        return data;
    }
}