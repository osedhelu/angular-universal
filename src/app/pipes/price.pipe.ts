import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceUSDT'
})

export class priceUSDT implements PipeTransform {
    public transform(item: any, replace, replacement): any {
        if (item == null) return "";
        item = item.replace(replace, replacement);
        return item;
    }
}