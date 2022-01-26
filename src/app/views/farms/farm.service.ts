import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Balance {
    btcRef: string;
    chainToken: string;
    completed: number;
    createdAt: Date;
    credito: number;
    debito: number;
    detail: string;
    id_User: string;
    prevBalance: number;
    updatedAt: Date;
    wallet: string;
    _id: string;
}
export interface venta {
    DailyTopay: Date;
    acountantBalance: Balance;
    bookDaily: bookDaily[];
    createdAt: Date;
    name: string;
    observation: string;
    package: _package;
    position: number;
    updatedAt: Date;
    user: string;
    _id: string;
}

export interface bookDaily {
    Observacion: string;
    complete: number;
    position: number;
    transaction: Balance;
    _id: string;
}
export interface _package {
    Favorite: boolean;
    Features: string;
    ID: number;
    Price: string;
    commission: number;
    dias: Date;
    img: string
    receives: boolean;
    status: boolean;
    timestamp: Date;
    toDairy: number
    totalYaz: number
    totalYazPlusYUtility: number
    user: string
    utility: number
}
@Injectable({
    providedIn: 'root',
})
export class FarmService {
    constructor() { }

}

