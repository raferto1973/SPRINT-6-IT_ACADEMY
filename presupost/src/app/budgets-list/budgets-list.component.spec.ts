// budget-list.component.spec.ts

//Aquesta prova verifica que calculateCost es crida amb els arguments correctes i que calculateTotal calcula correctament el total.

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetsListComponent } from './budgets-list.component';
import { BudgetService } from '../services/budget.service';
import { of } from 'rxjs';

describe('BudgetsListComponent', () => {
  let component: BudgetsListComponent;
  let fixture: ComponentFixture<BudgetsListComponent>;
  let budgetService: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BudgetsListComponent],
      providers: [BudgetService],
    });

    fixture = TestBed.createComponent(BudgetsListComponent);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
  });

  it('should calculate total correctly', () => {
  // Espia el mètode calculateCost i fes que retorni un valor específic
  spyOn(budgetService, 'calculateCost').and.returnValue(500);

  // Marca la casella de verificació 'Web'
  component.checkBoxForm.controls['checkboxWeb'].setValue(true);

  // Crida a calculateTotal
  component.calculateTotal(component.checkBoxForm.value);

  // Verifica que calculateCost s'hagi cridat amb els arguments correctes
  expect(budgetService.calculateCost).toHaveBeenCalledWith(0, 0);

  // Verifica que el total sigui correcte
  expect(component.total).toEqual(500);
});
});
