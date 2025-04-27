import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ExpedienteService } from '../services/expediente.service';
import { SenhasService } from '../services/senhas.service';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonButton 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonButton
  ]
})
export class Tab2Page {
  senhaEmitida: string = '';
  tipoSenhaEmitida: string = '';
  statusExpediente: string = '';
  horarioExpediente: { abertura: number, fechamento: number } = { abertura: 0, fechamento: 0 };

  constructor(
    private alertController: AlertController,
    private expedienteService: ExpedienteService,
    private senhasService: SenhasService
  ) {
    this.atualizarInfoExpediente();
  }

  private atualizarInfoExpediente() {
    this.statusExpediente = this.expedienteService.getStatusExpediente();
    this.horarioExpediente = this.expedienteService.getHorarioExpediente();
  }

  async emitirSenha(tipo: string) {
    if (this.expedienteService.isExpedienteEncerrado()) {
      const alert = await this.alertController.create({
        header: 'Expediente Encerrado',
        message: 'O atendimento está disponível apenas das 7h às 17h',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    this.senhaEmitida = this.senhasService.gerarNumeroSenha(tipo);
    this.tipoSenhaEmitida = tipo;
    
    const alert = await this.alertController.create({
      header: 'Senha Emitida',
      message: `Sua senha é: ${this.senhaEmitida}`,
      buttons: ['OK']
    });
    
    await alert.present();
  }
}