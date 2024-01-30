import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  webForm: FormGroup;
  totalCost = 0;

  constructor(
    private formBuilder: FormBuilder,
    private budgetService: BudgetService
  ) {
    this.webForm = this.formBuilder.group({
      pages: [1, Validators.required],
      languages: [1, Validators.required],
    });
  }

  ngOnInit() {
    this.webForm.valueChanges.subscribe((val) => {
      this.totalCost = this.budgetService.calculateCost(
        val.pages,
        val.languages
      );
      this.budgetService.changeCost(this.totalCost);
    });
  }

  incrementPages() {
    this.webForm.controls['pages'].setValue(
      this.webForm.controls['pages'].value + 1
    );
  }

  decrementPages() {
    this.webForm.controls['pages'].setValue(
      this.webForm.controls['pages'].value - 1
    );
  }

  incrementLanguages() {
    this.webForm.controls['languages'].setValue(
      this.webForm.controls['languages'].value + 1
    );
  }

  decrementLanguages() {
    this.webForm.controls['languages'].setValue(
      this.webForm.controls['languages'].value - 1
    );
  }
}
