import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonButton, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExpedienteService } from '../services/expediente.service';
import { SenhasService } from '../services/senhas.service';
import { GuichesService } from '../services/guiches.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonButton, IonList, IonItem, IonLabel
  ]
})
export class Tab3Page {
  senhaAtual: any = null;
  guicheAtual: string = '';
  ultimasSenhas: any[] = [];
  filaSenhas: any[] = [];
  guichesDisponiveis: string[] = [];

  constructor(
    private expedienteService: ExpedienteService,
    private senhasService: SenhasService,
    private guichesService: GuichesService,
    private alertController: AlertController
  ) {
    this.inicializarFila();
    this.guichesDisponiveis = this.guichesService.getGuiches();
  }

  inicializarFila() {
    // Simulação de fila inicial
    this.filaSenhas = [
      { numero: this.senhasService.gerarNumeroSenha('SP'), tipo: 'SP', timestamp: new Date() },
      { numero: this.senhasService.gerarNumeroSenha('SE'), tipo: 'SE', timestamp: new Date() },
      { numero: this.senhasService.gerarNumeroSenha('SG'), tipo: 'SG', timestamp: new Date() },
      { numero: this.senhasService.gerarNumeroSenha('SP'), tipo: 'SP', timestamp: new Date() },
      { numero: this.senhasService.gerarNumeroSenha('SG'), tipo: 'SG', timestamp: new Date() }
    ];
  }

  async chamarProximo() {
    if (this.expedienteService.isExpedienteEncerrado()) {
      this.limparFila();
      this.senhaAtual = { numero: 'Expediente Encerrado', tipo: '' };
      return;
    }

    if (!this.senhasService.verificarSeAtendida()) {
      const senhaNaoAtendida = this.filaSenhas.shift();
      await this.mostrarAlertaNaoAtendida(senhaNaoAtendida);
      return;
    }

    const guicheDisponivel = this.guichesService.getGuicheDisponivel();
    if (!guicheDisponivel) {
      this.senhaAtual = { numero: 'Todos guichês ocupados', tipo: '' };
      return;
    }

    this.guicheAtual = guicheDisponivel;
    this.guichesService.ocuparGuiche(this.guicheAtual);
    
    // Lógica de priorização
    let proximaSenha;
    const ultimoTipo = this.senhaAtual?.tipo;
    
    if (!ultimoTipo || ultimoTipo === 'SG' || ultimoTipo === 'SE') {
      proximaSenha = this.filaSenhas.find(s => s.tipo === 'SP');
    }
    
    if (!proximaSenha && ultimoTipo !== 'SE') {
      proximaSenha = this.filaSenhas.find(s => s.tipo === 'SE');
    }
    
    if (!proximaSenha) {
      proximaSenha = this.filaSenhas.find(s => s.tipo === 'SG');
    }

    if (!proximaSenha && this.filaSenhas.length > 0) {
      proximaSenha = this.filaSenhas[0];
    }

    if (!proximaSenha) {
      this.senhaAtual = { numero: 'Nenhuma senha na fila', tipo: '' };
      return;
    }

    this.filaSenhas = this.filaSenhas.filter(s => s.numero !== proximaSenha.numero);
    this.senhaAtual = {
      ...proximaSenha,
      horaChamada: new Date(),
      guiche: this.guicheAtual,
      tempoAtendimento: this.senhasService.calcularTempoMedio(proximaSenha.tipo)
    };
    
    this.ultimasSenhas.unshift({
      numero: this.senhaAtual.numero,
      tipo: this.senhaAtual.tipo,
      guiche: this.guicheAtual,
      hora: this.senhaAtual.horaChamada.toLocaleTimeString(),
      tempoAtendimento: this.senhaAtual.tempoAtendimento
    });
    
    if (this.ultimasSenhas.length > 5) {
      this.ultimasSenhas.pop();
    }
  }

  async finalizarAtendimento() {
    if (this.guicheAtual) {
      this.guichesService.liberarGuiche(this.guicheAtual);
    }
    this.senhaAtual = null;
    this.guicheAtual = '';
  }

  limparFila() {
    this.filaSenhas = [];
  }

  async mostrarAlertaNaoAtendida(senha: any) {
    const alert = await this.alertController.create({
      header: 'Senha Não Atendida',
      message: `A senha ${senha.numero} não foi atendida (5% de chance)`,
      buttons: ['OK']
    });
    await alert.present();
  }
}