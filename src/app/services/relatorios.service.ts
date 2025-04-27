import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRelatorioDiario(data: Date): Observable<any> {
    return this.http.get(`${this.apiUrl}/relatorios/diario?data=${data.toISOString()}`);
  }

  getRelatorioMensal(mes: number, ano: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/relatorios/mensal?mes=${mes}&ano=${ano}`);
  }

  getDadosRelatorio(): any {
    // Mock data - substituir por chamada API real
    return {
      totalEmitidas: 125,
      totalAtendidas: 119,
      detalhes: [
        { tipo: 'SP', emitidas: 30, atendidas: 29 },
        { tipo: 'SG', emitidas: 70, atendidas: 65 },
        { tipo: 'SE', emitidas: 25, atendidas: 25 }
      ]
    };
  }
}