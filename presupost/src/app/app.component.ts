// Importamos los módulos necesarios de Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importamos el componente personalizado
import { HomeComponent } from './home/home.component';

// Decorador del componente
@Component({
  selector: 'app-root', // Selector del componente
  standalone: true, // Indica que el componente puede existir de forma independiente
  imports: [RouterOutlet, HomeComponent], // Importaciones necesarias para el componente
  templateUrl: './app.component.html', // Plantilla HTML del componente
  styleUrl: './app.component.css', // Estilos CSS del componente
})
export class AppComponent {
  // Clase del componente
  title = 'presupost'; // Título de la aplicación
}
