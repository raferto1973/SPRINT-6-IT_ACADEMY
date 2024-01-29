import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
