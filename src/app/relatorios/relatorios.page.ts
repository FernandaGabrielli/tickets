import { Component } from '@angular/core';
import { RelatoriosService } from '../services/relatorios.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  providers: [DatePipe]
})
export class RelatoriosPage {
  tipoRelatorio: 'diario' | 'mensal' = 'diario';
  dataSelecionada: string;
  relatorio: any;
  carregando = false;

  constructor(
    private relatoriosService: RelatoriosService,
    private datePipe: DatePipe
  ) {
    this.dataSelecionada = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }

  carregarRelatorio() {
    this.carregando = true;
    
    // Simulação - substituir por chamada real ao serviço
    setTimeout(() => {
      this.relatorio = this.relatoriosService.getDadosRelatorio();
      this.carregando = false;
    }, 1000);
    
    // Versão real com API:
    /*
    if (this.tipoRelatorio === 'diario') {
      const data = new Date(this.dataSelecionada);
      this.relatoriosService.getRelatorioDiario(data).subscribe({
        next: (data) => {
          this.relatorio = data;
          this.carregando = false;
        },
        error: () => this.carregando = false
      });
    } else {
      const [ano, mes] = this.dataSelecionada.split('-');
      this.relatoriosService.getRelatorioMensal(+mes, +ano).subscribe({
        next: (data) => {
          this.relatorio = data;
          this.carregando = false;
        },
        error: () => this.carregando = false
      });
    }
    */
  }

  exportarRelatorio() {
    // Lógica para exportar relatório
    console.log('Exportando relatório:', this.relatorio);
  }
}