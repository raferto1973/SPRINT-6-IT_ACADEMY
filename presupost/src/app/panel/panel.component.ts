// Importamos los módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

// Decorador del componente
@Component({
  selector: 'app-panel', // Selector del componente
  standalone: true, // Indica que el componente puede existir de forma independiente
  imports: [CommonModule, ReactiveFormsModule], // Importaciones necesarias para el componente
  templateUrl: './panel.component.html', // Plantilla HTML del componente
  styleUrls: ['./panel.component.css'], // Estilos CSS del componente
})
export class PanelComponent implements OnInit {
  // Clase del componente
  webForm: FormGroup; // Formulario web
  totalCost = 0; // Costo total

  // Constructor del componente
  constructor(
    private formBuilder: FormBuilder, // Inyección de dependencia para FormBuilder
    private budgetService: BudgetService // Inyección de dependencia para BudgetService
  ) {
    // Inicialización del formulario web
    this.webForm = this.formBuilder.group({
      pages: [1, Validators.required], // Número de páginas
      languages: [1, Validators.required], // Número de idiomas
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Nos suscribimos a los cambios del formulario
    this.webForm.valueChanges.subscribe((val) => {
      // Calculamos el costo total
      this.totalCost = this.budgetService.calculateCost(
        val.pages,
        val.languages
      );
      // Actualizamos el costo total
      this.budgetService.changeCost(this.totalCost);
    });
  }

  // Método para incrementar el número de páginas
  incrementPages() {
    this.webForm.controls['pages'].setValue(
      this.webForm.controls['pages'].value + 1
    );
  }

  // Método para decrementar el número de páginas
  decrementPages() {
    this.webForm.controls['pages'].setValue(
      this.webForm.controls['pages'].value - 1
    );
  }

  // Método para incrementar el número de idiomas
  incrementLanguages() {
    this.webForm.controls['languages'].setValue(
      this.webForm.controls['languages'].value + 1
    );
  }

  // Método para decrementar el número de idiomas
  decrementLanguages() {
    this.webForm.controls['languages'].setValue(
      this.webForm.controls['languages'].value - 1
    );
  }
}
