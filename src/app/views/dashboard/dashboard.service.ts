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
  

}