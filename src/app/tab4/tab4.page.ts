import { Component, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
  IonList, IonItem, IonLabel, IonDatetime, IonSelect,
  IonSelectOption, IonButton, IonIcon, IonInput
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { downloadOutline, calendarOutline, settingsOutline, documentTextOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonList, IonItem, IonLabel, IonDatetime, IonSelect,
    IonSelectOption, IonButton, IonIcon, IonInput
  ]
})
export class Tab4Page {
  @ViewChild('datetime') datetime!: any;
  periodoRelatorio: 'diario' | 'mensal' = 'diario';
  dataSelecionada = new Date().toISOString();
  relatorioGerado = false;
  dadosRelatorio: any;

  constructor() {
    addIcons({ downloadOutline, calendarOutline, settingsOutline, documentTextOutline });
  }

  abrirDatetime() {
    this.datetime.open().then(() => {
      // Foco no datetime quando aberto
      setTimeout(() => {
        const picker = document.querySelector('ion-datetime');
        if (picker) picker.shadowRoot?.querySelector('button')?.focus();
      }, 100);
    });
  }

  fecharDatetime() {
    this.datetime.close();
  }

  atualizarFormatoData() {
    // Força atualização do formato quando muda o período
    this.dataSelecionada = new Date(this.dataSelecionada).toISOString();
  }

  formatarData(): string {
    const date = new Date(this.dataSelecionada);
    if (this.periodoRelatorio === 'diario') {
      return date.toLocaleDateString('pt-BR');
    } else {
      return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    }
  }

  gerarRelatorio() {
    this.relatorioGerado = true;
    this.dadosRelatorio = {
      totalAtendimentos: 124,
      tempoMedio: '7.5 minutos',
      detalhes: [
        { tipo: 'SP', quantidade: 30, tempoMedio: '15.2 min' },
        { tipo: 'SG', quantidade: 70, tempoMedio: '5.1 min' },
        { tipo: 'SE', quantidade: 24, tempoMedio: '1.2 min' }
      ],
      cabecalho: ['Tipo de Senha', 'Quantidade', 'Tempo Médio'],
      dadosExportacao: [
        ['SP', 30, '15.2 min'],
        ['SG', 70, '5.1 min'],
        ['SE', 24, '1.2 min'],
        ['TOTAL', 124, '7.5 min']
      ]
    };
  }

  async exportarRelatorio() {
    if (!this.dadosRelatorio) return;

    try {
      // Cria a planilha com formatação melhorada
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
        ['Relatório de Atendimento - UNINASSAU', '', ''],
        ['Período:', this.periodoRelatorio === 'diario' ? 'Diário' : 'Mensal', ''],
        ['Data:', this.formatarData(), ''],
        [], // linha vazia
        this.dadosRelatorio.cabecalho,
        ...this.dadosRelatorio.dadosExportacao
      ]);

      // Ajusta a largura das colunas
      ws['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }];

      // Formatação do cabeçalho
      for (let i = 0; i < this.dadosRelatorio.cabecalho.length; i++) {
        const cell = XLSX.utils.encode_cell({ r: 4, c: i });
        ws[cell].s = { font: { bold: true } };
      }

      // Cria o workbook
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Relatório');

      // Gera o arquivo Excel
      const dataStr = this.periodoRelatorio === 'diario' 
        ? new Date(this.dataSelecionada).toISOString().slice(0, 10)
        : new Date(this.dataSelecionada).toISOString().slice(0, 7);
      
      const nomeArquivo = `relatorio_atendimento_${dataStr}.xlsx`;
      XLSX.writeFile(wb, nomeArquivo);

    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
    }
  }
}