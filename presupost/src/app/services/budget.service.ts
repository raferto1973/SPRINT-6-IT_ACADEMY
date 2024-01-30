// Importamos los módulos necesarios de Angular
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Decorador del servicio
@Injectable({
  providedIn: 'root', // Indica que el servicio está disponible en toda la aplicación
})
export class BudgetService {
  // Clase del servicio
  private costSource = new BehaviorSubject(0); // Fuente de datos para el costo
  currentCost = this.costSource.asObservable(); // Observable para el costo actual

  // Método para calcular el costo
  calculateCost(pages: number, languages: number): number {
    let cost = pages * languages * 30; // Calculamos el costo
    this.changeCost(cost); // Actualizamos el costo
    return cost; // Devolvemos el costo
  }

  // Método para cambiar el costo
  changeCost(cost: number) {
    this.costSource.next(cost); // Actualizamos la fuente de datos con el nuevo costo
  }
}
