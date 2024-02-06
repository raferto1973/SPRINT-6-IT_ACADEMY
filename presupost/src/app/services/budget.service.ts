import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {

  private costSource = new BehaviorSubject(0);        // Font de dades per el cost
  currentCost = this.costSource.asObservable();       // Observable per el cost actual

  // Métode per calcular el cost
  calculateCost(pages: number, languages: number): number {
    let cost = pages * languages * 30;                // Calculem el cost
    this.changeCost(cost);                            // Cambiem el cost
    return cost;                                      // Returnem el cost
  }

  // Métode per cambiar el cost
  changeCost(cost: number) {
    this.costSource.next(cost);                       // Actualitzem la font de dades amb el nou cost
  }

  getCostSource() {
    return this.costSource;
  }


}
