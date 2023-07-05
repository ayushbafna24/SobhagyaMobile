import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorComponent } from './error/error.component';

export const components = [ErrorComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, IonicModule],
  exports: components,
})
export class ComponentsModule {}
