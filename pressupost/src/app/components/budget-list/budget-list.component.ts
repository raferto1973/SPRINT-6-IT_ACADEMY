
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


  // Mètode per filtrar els pressupostos de forma dinàmica
  filterBudgets(): void {
    if (!this.searchTerm.trim()) {
      this.sortedBudgets = [...this.budgets];
    } else {
      this.sortedBudgets = this.budgets.filter(budget =>
        budget.clientName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Mètode per ordenar els pressupostos
  sortBy(criteria: string): void {
    if (criteria === 'date') {
      this.sortedBudgets = this.sortedBudgets.sort((a, b) => a.id - b.id);
    } else if (criteria === 'price') {
      this.sortedBudgets = this.sortedBudgets.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (criteria === 'name') {
      this.sortedBudgets = this.sortedBudgets.sort((a, b) => a.clientName.localeCompare(b.clientName));
    }
  }


}
