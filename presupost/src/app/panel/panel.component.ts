import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  webForm: FormGroup;
  totalCost = 0;

  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService) {
    this.webForm = this.formBuilder.group({
      pages: [1, Validators.required],
      languages: [1, Validators.required]
    });
  }

  ngOnInit() {
    this.webForm.valueChanges.subscribe(val => {
      this.totalCost = this.budgetService.calculateCost(val.pages, val.languages);
    });
    
  }

  incrementPages() {
    this.webForm.controls['pages'].setValue(this.webForm.controls['pages'].value + 1);
  }

  decrementPages() {
    this.webForm.controls['pages'].setValue(this.webForm.controls['pages'].value - 1);
  }

  incrementLanguages() {
    this.webForm.controls['languages'].setValue(this.webForm.controls['languages'].value + 1);
  }

  decrementlanguages() {
    this.webForm.controls['languages'].setValue(this.webForm.controls['languages'].value - 1);
  }

}


