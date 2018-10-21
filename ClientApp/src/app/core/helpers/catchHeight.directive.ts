import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { resolve } from 'q';

@Directive({ selector: '[catchHeight]' })
export class HeightDirective {

    recheck;

    constructor(private el: ElementRef,
        private app: ApplicationService) {
    }

    ngAfterViewInit() {
        this.app.element$.next({
            index: this.el.nativeElement.dataset['index'],
            height: this.el.nativeElement.offsetHeight
        })
    }
}