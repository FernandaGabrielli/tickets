import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Tab2PageRoutingModule
  ]
  // Sem declarationspois o componente é standalone
})
export class Tab2PageModule {}