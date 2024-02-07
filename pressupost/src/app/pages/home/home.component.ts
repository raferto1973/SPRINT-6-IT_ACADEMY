
// home.component.ts


import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { navBarComponent } from '../../shared/navBar/navBar.component';
import { FormBudgetComponent } from '../../shared/forms/form-budget/form-budget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ HeaderComponent, CommonModule, navBarComponent, FormBudgetComponent],

})
export class HomeComponent {}
