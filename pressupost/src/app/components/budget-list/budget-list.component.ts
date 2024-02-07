
//budget-list.component.ts


import { Component, OnInit } from '@angular/core';
import { Budget } from '../../models/budget';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss',
})

export class BudgetListComponent implements OnInit {
  budgets: Budget[] = [];                             // Array de presupostos
  sortedBudgets: Budget[] = [];                       // Array de presupostos ordenats
  searchTerm: string = '';                            // Terme de búsqueda

  // Injecta el servei ServicesService
  constructor(private servicesService: ServicesService) {}

  // Inicialitza el component
  ngOnInit(): void {
    this.servicesService.budgetsList$.subscribe((budgets) => {
      this.budgets = budgets;
      this.sortedBudgets = [...budgets];              // SortedBudgets és igual a budgets
    });
  }

  // Mètode per buscar els pressupostos
  search(): void {
    if (!this.searchTerm.trim()) {

      // Si el terme de búsqueda està buit, mostra tots els pressupostos
      this.sortedBudgets = [...this.budgets];
    } else {

      // Si el terme de búsqueda no està buit, mostra els pressupostos que contenen el terme de búsqueda
      this.sortedBudgets = this.budgets.filter((budget) =>
        budget.clientName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Mètode per ordenar els pressupostos
  sortBy(criteria: string): void {
    if (criteria === 'date') {
      this.sortedBudgets = [...this.budgets].sort((a, b) => a.id - b.id);
    } else if (criteria === 'price') {
      this.sortedBudgets = [...this.budgets].sort(
        (a, b) => a.totalPrice - b.totalPrice
      );
    } else if (criteria === 'name') {
      this.sortedBudgets = [...this.budgets].sort((a, b) =>
        a.clientName.localeCompare(b.clientName)
      );
    }
  }
}
