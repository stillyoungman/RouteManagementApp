import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorter'
})
export class ShorterPipe implements PipeTransform {
    transform(value:string){
        if(!value){
            return value;
        } else if ( value.length <= 64){
            return value;
        } else return value.slice(0,60).trim() + '...'
    }
}