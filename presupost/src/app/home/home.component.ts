
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WelcomeComponent } from "../shared/welcome/welcome.component";
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, WelcomeComponent, BudgetsListComponent ]
})

export class HomeComponent {}
