
// budgets-list.component.ts

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule, } from '@angular/forms';

import { BudgetService } from '../services/budget.service';
import { PanelComponent } from '../panel/panel.component';

// Definim la interfaz per els serveis
interface Service {
  name: string;
  description: string;
  price: number;
  checkbox: string;
  selected: boolean;
}

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PanelComponent, FormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetsListComponent {


  // Llista de serveis
  services: Service[] = [
    {
      name: 'Seo',
      description: "Programació d'una web responsive completa.",
      price: 300,
      checkbox: 'checkboxSeo',
      selected: false,
    },
    {
      name: 'Ads',
      description: "Programació d'una web responsive completa.",
      price: 400,
      checkbox: 'checkboxAds',
      selected: false,
    },
    {
      name: 'Web',
      description: "Programació d'una web responsive completa.",
      price: 500,
      checkbox: 'checkboxWeb',
      selected: false,
    },
  ];

  checkBoxForm: FormGroup;                    // Formulari de caselles de verificació
  total = 0;                                  // Total acumulat
  service: any;


  constructor(
    private formBuilder: FormBuilder,         // Injecció de dependencies per FormBuilder
    private budgetService: BudgetService      // Injecció de dependencies per BudgetService
  ) {
    // Inicializació del formulari
    this.checkBoxForm = this.formBuilder.group({
      checkboxSeo: [false],
      checkboxAds: [false],
      checkboxWeb: [false],
      numPagines: ['1', Validators.min(1)],
      numIdiomes: [1, Validators.min(1)],
    });
  }

 // Mètode que s'executa al inizialitzar el component
 ngOnInit() {
  // Ens hem subscrit als canvis del formulari
  this.checkBoxForm.valueChanges.subscribe((val) => {
    this.calculateTotal(val);
  });

  // Ens hem subscrit als canvis en el cost de BudgetService.
  this.budgetService.currentCost.subscribe((cost: number) => {
    this.calculateTotal(this.checkBoxForm.value);
  });
}

// Mètode per calcular el total.
calculateTotal(val: any) {
  let totalservices = 0;

  // Calculem el total dels serveis seleccionats.
  for (const service of this.services) {
    if (val[service.checkbox]) {
      totalservices += service.price;
      service.selected = true;
    } else {
      service.selected = false;
    }
  }

  // Si s'ha seleccionat el servei 'Web', afegim el cost actual del servei
  if (val['checkboxWeb']) {
    this.budgetService.currentCost.subscribe((cost: number) => {
      this.total = totalservices + cost;
    });
  } else {
    this.total = totalservices;
  }
}

  updateTotal(event: { cost: number }) {
    this.total = event.cost;
  }

  // Mètode que s'executa en enviar el formulari.
  onSubmit() {
    console.log(this.checkBoxForm.value);       // Imprimim els valors del formulari
  }
}
