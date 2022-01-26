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
}
const data: DataItem[] = [
    { country: 'pack', commodity: 'Nuclear', total: 84634 },
    { country: 'pack', commodity: 'Thermal', total: 419591 },
    { country: 'pack', commodity: 'Wind', total: 78598 },
    { country: 'pack', commodity: 'Solar', total: 38098 },
    { country: 'ventas', commodity: 'Solar', total: 38098 },

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
    pack4: 30,
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