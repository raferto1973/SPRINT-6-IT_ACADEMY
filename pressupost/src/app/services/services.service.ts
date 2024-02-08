
//services/services.services.ts

//Aquest fitxer conté el servei ServicesService, que conté el model de servei i el model de pressupost, així com un array de serveis i un BehaviorSubject amb els pressupostos inicials.


import { Injectable } from '@angular/core';
import { Service } from '../models/service';
import { Budget } from '../models/budget';
import { BehaviorSubject } from 'rxjs';


// L'injeció de dependències es fa amb el decorador @Injectable
@Injectable({
  providedIn: 'root',
})


export class ServicesService {

  // Defineix els serveis disponibles
  dataService: Service[] = [
    {
      id: 0,
      name: 'Seo',
      description: 'Augmenta el trànsit del teu lloc web amb una estratègia SEO única.',
      price: 300,
      selected: false,
    },
    {
      id: 1,
      name: 'Ads',
      description: 'Apareix a la part superior dels resultats de la cerca de Google.',
      price: 400,
      selected: false,
    },
    {
      id: 2,
      name: 'Web',
      description: 'Programación de una web responsive completa',
      price: 500,
      selected: false,
    },

  ];


  // Defineix els pressupostos inicials de exemple
  private initialBudgets: Budget[] = [

    {
      id: 0,
      clientName: 'Rafa Fernandez',
      email: 'rafa.fernandez@gmail.com',
      phone: '652 652 652',
      serviceName: ['Web (1 pàgines, 1 llenguatges)', 'SEO'],
      totalPrice: 860,
    },
    {
      id: 1,
      clientName: 'Laura Caparrós',
      email: 'laura.caparros@gmail.com',
      phone: '630 630 630',
      serviceName: ['Ads', 'SEO'],
      totalPrice: 700,
    },
    {
      id: 2,
      clientName: 'Pepe García',
      email: 'pepe@gmail.com',
      phone: '631 597 179',
      serviceName: ['Seo'],
      totalPrice: 300,
    },
    {
      id: 3,
      clientName: 'Alex Fernandez',
      email: 'alex@gmail.com',
      phone: '630 050 991',
      serviceName: ['Ads'],
      totalPrice: 400,
    },
  ];

  //  Crea un BehaviorSubject amb els pressupostos inicials
  private budgetsList = new BehaviorSubject<Budget[]>(this.initialBudgets);

  //  Crea un observable a partir del BehaviorSubject
  budgetsList$ = this.budgetsList.asObservable();

  // Crea un BehaviorSubject amb els serveis disponibles
  constructor() {}

  // Retorna els serveis disponibles
  addBudget(budget: Budget) {

    // Afegeix un pressupost a la llista de pressupostos
    const currentBudgets = this.budgetsList.value;

    // Obtenir el següent ID disponible
    const nextId =
      currentBudgets.length > 0
        ? Math.max(...currentBudgets.map((b) => b.id)) + 1
        : 1;

    // Crea un nou pressupost amb el següent ID disponible
    const newBudget = { ...budget, id: nextId };
    this.budgetsList.next([...currentBudgets, newBudget]);
  }
}
