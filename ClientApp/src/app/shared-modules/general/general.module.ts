import { NgModule } from '@angular/core';
import { HeightDirective } from 'src/app/core/helpers/catchHeight.directive';

@NgModule({
  declarations: [
    HeightDirective
  ],
  exports: [
    HeightDirective
  ]
})
export class GeneralModule { }
