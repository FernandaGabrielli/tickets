import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Tab4PageRoutingModule } from './tab4-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Tab4PageRoutingModule
  ]
  // Sem declarations pois o componente é standalone
})
export class Tab4PageModule {}