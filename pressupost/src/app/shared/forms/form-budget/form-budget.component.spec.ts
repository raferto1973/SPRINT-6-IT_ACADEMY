
//form-budget.component.spec.ts

// Aquest test comprova dues coses bàsiques: que el component es crea (should create) i que el formulari s'inicialitza correctament amb els camps esperats (should initialize form fields correctly). En particular, verifica que el camp fName existeixi dins del FormGroup i que el seu valor inicial sigui el que esperem, que en aquest exemple és una cadena buida.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBudgetComponent } from './form-budget.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormBudgetComponent', () => {
  let component: FormBudgetComponent;
  let fixture: ComponentFixture<FormBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Afegim FormBudgetComponent aquí
      schemas: [NO_ERRORS_SCHEMA] // Utilitzem NO_ERRORS_SCHEMA per evitar errors de plantilla durant la prova
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta els canvis per inicialitzar el formulari
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields correctly', () => {
    // Comprova que el formulari s'ha creat
    expect(component.formBudget).toBeTruthy();

    // Comprova que el camp fName estigui present i sigui inicialitzat correctament, si s'espera un valor inicial
    expect(component.formBudget.contains('fName')).toBeTruthy();
    expect(component.formBudget.get('fName')?.value).toEqual(''); // Ajusta aquest valor segons l'esperat en la inicialització
  });
});

