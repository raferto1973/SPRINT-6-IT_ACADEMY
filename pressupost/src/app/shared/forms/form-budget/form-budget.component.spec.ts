
//form-budget.component.spec.ts

// Aquest fitxer conté el test del component FormBudgetComponent.

/**
Aquest test fa el següent:
Configura l'entorn de prova i crea una instància del component.
Verifica que el component es crea correctament.
En el test should add budget and reset form on valid submission, primer assegura que el formulari estigui inicialitzat correctament amb ngOnInit().
Després, simula un usuari omplint el formulari amb dades vàlides utilitzant setValue en formBudget.
Invoca el mètode addBudget per processar el formulari.
Finalment, verifica si l'array registredBudgets s'ha actualitzat correctament, si l'estat formSubmittedSuccessfully és true (indicant un enviament exitós), si el formulari s'ha reinicialitzat al seu estat pristine, i si l'estat submitted s'ha reiniciat a false.
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, } from '@angular/forms';
import { FormBudgetComponent } from './form-budget.component';
import { CommonModule } from '@angular/common';

describe('FormBudgetComponent', () => {
  let component: FormBudgetComponent;
  let fixture: ComponentFixture<FormBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBudgetComponent],
      imports: [ReactiveFormsModule, CommonModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(FormBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add budget and reset form on valid submission', () => {

    // Inicialitzar el formulari
    component.ngOnInit();

    // Simular un enviament vàlid
    component.formBudget.setValue({
      serviceFormArray: [], // No es necesari per aquest test
      fName: 'Test Name',
      fPhone: '123456789',
      fEmail: 'test@example.com',
    });

    // Enviar el formulari
    component.addBudget();

    // Verificar que el pressupost s'ha afegit correctament
    expect(component.registredBudgets.length).toBeGreaterThan(0);     // Inicialment és 0
    expect(component.formSubmittedSuccessfully).toBeTrue();
    expect(component.formBudget.pristine).toBeTrue();                 // Verifica que el formulari s'ha reiniciat
    expect(component.submitted).toBeFalse();                          // Verifica que el formulari s'ha reiniciat
  });
});

