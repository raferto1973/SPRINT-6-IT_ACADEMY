// Importamos los módulos necesarios de Angular
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Importamos los componentes personalizados
import { WelcomeComponent } from '../welcome/welcome.component';
import { PanelComponent } from '../panel/panel.component';

// Decorador del componente
@Component({
  selector: 'app-home', // Selector del componente
  standalone: true, // Indica que el componente puede existir de forma independiente
  imports: [CommonModule, WelcomeComponent, PanelComponent], // Importaciones necesarias para el componente
  templateUrl: './home.component.html', // Plantilla HTML del componente
  styleUrl: './home.component.css', // Estilos CSS del componente
  changeDetection: ChangeDetectionStrategy.OnPush, // Estrategia de detección de cambios
})
export class HomeComponent {} // Clase del componente
