import { Injectable } from '@angular/core';
import { Senha } from '../models/senha.model';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  verificarSeAtendida(): boolean {
    return Math.random() >= 0.05; // 95% de chance de ser atendida
  }

  gerarNumeroSenha(tipo: string): string {
    const now = new Date();
    const yy = now.getFullYear().toString().substr(-2);
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const dd = now.getDate().toString().padStart(2, '0');
    const sq = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    return `${yy}${mm}${dd}-${tipo}${sq}`;
  }

  calcularTempoMedio(tipo: string): number {
    switch(tipo) {
      case 'SP': return 15 + (Math.random() > 0.5 ? 5 : -5);
      case 'SE': return Math.random() > 0.05 ? 1 : 5;
      case 'SG': return 5 + (Math.random() > 0.5 ? 3 : -3);
      default: return 0;
    }
  }
}