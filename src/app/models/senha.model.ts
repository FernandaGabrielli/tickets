export interface Senha {
    id?: number;
    numero: string;
    tipo: 'SP' | 'SG' | 'SE';
    dataEmissao: Date;
    dataAtendimento?: Date;
    guiche?: string;
    atendida: boolean;
    tempoAtendimento?: number;
  }