// Importamos los módulos necesarios de Angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

// Importamos los componentes y servicios personalizados
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';

// Definimos la interfaz para los servicios
interface Servicio {
  nombre: string;
  descripcion: string;
  precio: number;
  checkbox: string;
}

// Decorador del componente
@Component({
  selector: 'app-welcome', // Selector del componente
  standalone: true, // Indica que el componente puede existir de forma independiente
  imports: [CommonModule, ReactiveFormsModule, PanelComponent], // Importaciones necesarias para el componente
  templateUrl: './welcome.component.html', // Plantilla HTML del componente
  styleUrls: ['./welcome.component.css'], // Estilos CSS del componente
  changeDetection: ChangeDetectionStrategy.OnPush, // Estrategia de detección de cambios
})
export class WelcomeComponent implements OnInit {
  // Clase del componente
  checkBoxForm: FormGroup; // Formulario de casillas de verificación
  total = 0; // Total acumulado

  // Lista de servicios
  servicios: Servicio[] = [
    {
      nombre: 'Seo',
      descripcion: "Programació d'una web responsive completa.",
      precio: 300,
      checkbox: 'checkboxSeo',
    },
    {
      nombre: 'Ads',
      descripcion: "Programació d'una web responsive completa.",
      precio: 400,
      checkbox: 'checkboxAds',
    },
    {
      nombre: 'Web',
      descripcion: "Programació d'una web responsive completa.",
      precio: 500,
      checkbox: 'checkboxWeb',
    },
  ];

  // Constructor del componente
  constructor(
    private formBuilder: FormBuilder, // Inyección de dependencia para FormBuilder
    private budgetService: BudgetService // Inyección de dependencia para BudgetService
  ) {
    // Inicialización del formulario
    this.checkBoxForm = this.formBuilder.group({
      checkboxSeo: [false],
      checkboxAds: [false],
      checkboxWeb: [false],
      numPagines: [1, Validators.min(1)],
      numIdiomes: [1, Validators.min(1)],
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Nos suscribimos a los cambios del formulario
    this.checkBoxForm.valueChanges.subscribe((val) => {
      let totalServicios = 0;

      // Calculamos el total de los servicios seleccionados
      for (const servicio of this.servicios) {
        if (val[servicio.checkbox]) {
          totalServicios += servicio.precio;
        }
      }

      // Si se seleccionó el servicio 'Web', añadimos el coste actual del servicio
      if (val['checkboxWeb']) {
        this.budgetService.currentCost.subscribe((cost: number) => {
          this.total = totalServicios + cost;
        });
      } else {
        this.total = totalServicios;
      }
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log(this.checkBoxForm.value); // Imprimimos los valores del formulario
  }
}
