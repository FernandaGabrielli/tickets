import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { Tab3Page } from './tab3.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Tab3PageRoutingModule
  ]
  // Não precisa de declarations se usando standalone
})
export class Tab3PageModule {}