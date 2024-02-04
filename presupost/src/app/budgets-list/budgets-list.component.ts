// budgets-list.component.ts

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeCa from '@angular/common/locales/ca';
import { Subscription } from 'rxjs';

import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../../models/budget.model';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeCa, 'ca');

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelComponent],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'ca' }, // Configurar el idioma a catalan
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetsListComponent implements OnInit, OnDestroy {
  budgetForm: FormGroup;
  totalBudget = 0;
  budgets: Budget[] = [];
  filteredBudgets: Budget[] = [];
  searchInputValue = '';
  webCampaignObj = {
    numberOfPagesTotal: 0,
    numberOfLanguagesTotal: 0,
  };
  sortBy: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  formSubmitted = false;
  showError = false;

  private formValueChangesSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef
  ) {
    this.budgetForm = this.fb.group({
      seoCampaign: false,
      adsCampaign: false,
      webCampaign: false,
      webCampaignObj: { numberOfPagesTotal: 0, numberOfLanguagesTotal: 0 },
      webCost: 0,
      clientName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      searchInput: [''],
    });
  }

  ngOnInit(): void {
    this.formValueChangesSubscription = this.budgetForm.valueChanges.subscribe(
      () => {
        this.calculateTotalBudget();
      }
    );
    this.budgets = this.budgetService.getBudgetsSync();
    this.filteredBudgets = [...this.budgets];
    this.formSubmitted = false;
  }

  calculateTotalBudget() {
    const { seoCampaign, adsCampaign, webCampaign, webCost } =
      this.budgetForm.value;
    this.totalBudget = this.budgetService.calculateTotalBudget(
      seoCampaign,
      adsCampaign,
      webCampaign,
      webCost
    );
  }

  isChecked(formControlName: string): boolean {
    if (this.budgetForm.get(formControlName)?.value) {
      this.showError = false;
    }
    return this.budgetForm.get(formControlName)?.value ?? false;
  }

  submitBudget() {
    this.formSubmitted = true;

    if (this.budgetForm.invalid) {
      this.showError = true;
      this.budgetForm.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    const {
      seoCampaign,
      adsCampaign,
      webCampaign,
      webCost,
      clientName,
      phone,
      email,
    } = this.budgetForm.value;

    const selectedServiceCount = [seoCampaign, adsCampaign, webCampaign].filter(
      (service) => service
    ).length;

    /* if (selectedServiceCount === 0) {
      this.budgetForm.get('seoCampaign')?.setErrors({ 'is-invalid': true });
      this.budgetForm.get('adsCampaign')?.setErrors({ 'is-invalid': true });
      this.budgetForm.get('webCampaign')?.setErrors({ 'is-invalid': true });
    } else {
      this.budgetForm.get('seoCampaign')?.setErrors(null);
      this.budgetForm.get('adsCampaign')?.setErrors(null);
      this.budgetForm.get('webCampaign')?.setErrors(null);
    } */

    const budget: Budget = {
      seoCampaign,
      adsCampaign,
      webCampaign,
      webCampaignObj: { ...this.webCampaignObj },
      webCost,
      clientName,
      phone,
      email,
      totalBudget: this.totalBudget,
      date: new Date(),
    };

    // Actualiza webCampaignObj antes de agregar el presupuesto
    this.webCampaignObj = {
      ...this.webCampaignObj,
      ...this.budgetForm.value.webCampaignObj,
    };

    this.budgetService.addBudget(budget);

    // Actualiza la lista de presupuestos directamente
    this.budgets = this.budgetService.getBudgetsSync();
    this.filteredBudgets = [...this.budgets];

    this.budgetForm.reset();
    this.webCampaignObj = { numberOfPagesTotal: 0, numberOfLanguagesTotal: 0 };

    this.cdr.markForCheck();
  }

  isValidField(field: string): boolean | null {
    return (
      this.budgetForm.controls[field].errors &&
      this.budgetForm.controls[field].touched
    );
  }

  ngOnDestroy(): void {
    if (
      this.formValueChangesSubscription &&
      !this.formValueChangesSubscription.closed
    ) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }

  handleFormPanel(formValues: {
    numberOfPages: number;
    numberOfLanguages: number;
  }) {
    this.webCampaignObj.numberOfPagesTotal = formValues.numberOfPages;
    this.webCampaignObj.numberOfLanguagesTotal = formValues.numberOfLanguages;
  }

  searchBudgets() {
    const searchValue = this.budgetForm.get('searchInput')?.value || '';
    this.filteredBudgets = this.budgets.filter((budget) =>
      budget.clientName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  onSearchInputFocus() {
    // Asigna un valor diferente a searchInputValue cuando el input obtiene el foco
    this.searchInputValue = 'focused';
  }

  onSearchInputBlur() {
    // Si el valor del input no está vacío, mantiene la clase "active"; de lo contrario, la quita
    if (this.budgetForm.get('searchInput')?.value.trim() === '') {
      this.searchInputValue = '';
    }
  }

  sortBudgetsDate() {
    this.sortBy = 'date';
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredBudgets = this.budgetService.sortBudgetsDate(
      this.filteredBudgets,
      this.sortDirection
    );
  }

  sortBudgetsTotal() {
    this.sortBy = 'totalBudget';
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredBudgets = this.budgetService.sortBudgetsTotal(
      this.filteredBudgets,
      this.sortDirection
    );
  }

  sortBudgetsName() {
    this.sortBy = 'clientName';
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredBudgets = this.budgetService.sortBudgetsName(
      this.filteredBudgets,
      this.sortDirection
    );
  }
}
