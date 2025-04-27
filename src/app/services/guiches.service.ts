import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuichesService {
  private guiches: string[] = ['G01', 'G02', 'G03'];
  private guichesOcupados: {[key: string]: boolean} = {};

  constructor() {
    this.guiches.forEach(g => this.guichesOcupados[g] = false);
  }

  getGuicheDisponivel(): string | null {
    const guicheLivre = this.guiches.find(g => !this.guichesOcupados[g]);
    return guicheLivre || null;
  }

  ocuparGuiche(guiche: string): void {
    if (this.guiches.includes(guiche)) {
      this.guichesOcupados[guiche] = true;
    }
  }

  liberarGuiche(guiche: string): void {
    if (this.guiches.includes(guiche)) {
      this.guichesOcupados[guiche] = false;
    }
  }

  getGuiches(): string[] {
    return [...this.guiches];
  }

  adicionarGuiche(novoGuiche: string): void {
    if (!this.guiches.includes(novoGuiche)) {
      this.guiches.push(novoGuiche);
      this.guichesOcupados[novoGuiche] = false;
    }
  }
}