import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Tab1PageRoutingModule
  ]
  // Sem declarations pois o componente é standalone
})
export class Tab1PageModule {}