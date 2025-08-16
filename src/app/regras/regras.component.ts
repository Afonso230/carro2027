import { Component, OnInit } from '@angular/core';

interface RegrasContent {
  titulo:string,regras:string[];
}

@Component({
    selector: 'app-regras',
    templateUrl: './regras.component.html',
    styleUrls: ['./regras.component.css'],
    standalone: false
})
export class RegrasComponent implements OnInit {

  tipoRegraSelecionado: string = '';
  regrasExibidas: string[] = [];

  todasAsRegras: RegrasContent[] = [
    {
      titulo:"Regras de Quotas",
      regras: [
        'Regra 1: O pagamento das quotas, sem multa, tem de ser feito até ao fim do mês corrente.',
        'Regra 2: A partir do 1ºdia do mês seguinte adiciona 1€ a cada dia até ao 10º dia.',
        'Regra 3: Do 10º ao último dia do mês o valor da multa é 10€.',
        'Regra 4: Ao passarem 2 meses a multa passa para 20€.',
        'EXEMPLO: Se a quota de ABRIL for paga a 4 de MAIO a multa será de 4€ totalizando 14€ de quota'
      ]
    },
    {
      titulo:"Regras de Convívios",
      regras: [
        'Regra 1: É PROÍBIDO a qualquer membro, exceto os da comissão, oferecer bebidas. Os membros da comissão só podem oferecer bebidas a membros de outras comissões. O incumprimento desta regra implicará uma multa de 5€.',
        'Regra 2: Em caso de ausência a um turno marcado, será aplicada uma multa de 5€ na primeira ocorrência. As ausências subsequentes serão multadas em 10€.',
        'Regra 3: A presença dos membros nos convívios é obrigatória, sendo que a ausência a dois convívios consecutivos implicará uma multa de 2€, e a acumulação de quatro ausências ao longo do ano letivo resultará numa multa de 10€',
        'Regra 4: A pontualidade no início dos turnos é exigida. Após 5 minutos da hora marcada, será aplicada uma multa de 5€.',
        'Regra 5: Caso um membro se apresente incapacitado(a) por embriaguez para realizar o turno, será aplicada uma multa de 2€.'
      ]
    },
    {
      titulo:"Regras de Reuniões",
      regras: [
        'Regra 1: Após uma tolerância de 15 minutos no início das reuniões, será aplicada uma multa de 2€ por atraso.',
        'Regra 2: A presença em reuniões é obrigatória para todos os membros. A primeira e a segunda faltas implicarão uma multa de 2€ cada. A partir da terceira e quarta faltas, a multa será de 5€ cada, e da quinta falta em diante, a multa será de 10€',
        'Regra 3: A pontualidade no início dos turnos é exigida. Após 5 minutos da hora marcada, será aplicada uma multa de 5€.',
        'Regra 4: Caso um membro se apresente incapacitado(a) por embriaguez para realizar o turno, será aplicada uma multa de 2€.'
      ]
    },
    {
      titulo:"Regras de Rifas",
      regras: [
        'Regra 1: O valor correspondente à totalidade das rifas entregues como obrigatórias deve ser devolvido em dinheiro.',
        'Regra 2: As rifas opcionais não são sujeitas à regra 1',
      ]
    },
    {
      titulo:"Regras de Jantares de Curso",
      regras: [
        'Regra 1: Os membros que faltarem a um jantar de curso terão de pagar a diferença entre o custo real por pessoa do evento e o preço definido para os participantes.',
        'EXEMPLO: Se o restaurante cobrar 14€ por pessoa e o preço para os participantes for 15€, o membro ausente pagará 1€.'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void { }

}