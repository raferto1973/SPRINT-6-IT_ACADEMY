import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private costSource = new BehaviorSubject(0);
  currentCost = this.costSource.asObservable();

  calculateCost(pages: number, languages: number): number {
    let cost = pages * languages * 30;
    this.changeCost(cost);
    return cost;
  }

  changeCost(cost: number) {
    this.costSource.next(cost);
  }
}
