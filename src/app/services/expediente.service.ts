import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  private readonly HORA_ABERTURA = 7;
  private readonly HORA_FECHAMENTO = 17;

  constructor() {}

  isExpedienteAtivo(): boolean {
    const agora = new Date();
    const horas = agora.getHours();
    return horas >= this.HORA_ABERTURA && horas < this.HORA_FECHAMENTO;
  }

  isExpedienteEncerrado(): boolean {
    return !this.isExpedienteAtivo();
  }

  getStatusExpediente(): string {
    return this.isExpedienteAtivo() ? 'Aberto' : 'Fechado';
  }

  getHorarioExpediente(): { abertura: number, fechamento: number } {
    return {
      abertura: this.HORA_ABERTURA,
      fechamento: this.HORA_FECHAMENTO
    };
  }
}