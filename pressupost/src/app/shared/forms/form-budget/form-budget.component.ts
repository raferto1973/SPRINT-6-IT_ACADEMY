
//form-budget-component.ts

import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service';
import { ServicesService } from '../../../services/services.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Budget } from '../../../models/budget';
import { CustomValidators } from '../../../custom-validators';
import { BudgetListComponent } from '../../../components/budget-list/budget-list.component';


@Component({
  selector: 'app-form-budget',
  standalone: true,
  templateUrl: './form-budget.component.html',
  styleUrl: './form-budget.component.scss',
  imports: [ReactiveFormsModule, CommonModule, BudgetListComponent],
})

export class FormBudgetComponent implements OnInit {

  // Array de serveis
  services: Service[];

  // Formulari principal
  formBudget: FormGroup;
  extraPrice: any;
  shareableURL: string = ''; // Variable per emmagatzemar l'URL de compartir

  ngOnInit(): void{
    this.services = this.servicesService.dataService;
  }


  constructor(
    private servicesService: ServicesService,
    private fb: FormBuilder,          // Injecta FormBuilder

  ) {

    // Constructor de serveis
    this.services = servicesService.dataService;

    // Inicialitzar el formulari
    this.formBudget = this.fb.group({
      serviceFormArray: this.buildServiceFormArray(),
      fName: [
        '',
        // Validacions camp fName
        [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.onlyLetters,
        ],
      ],
      fPhone: ['', [Validators.required, CustomValidators.onlyPhones]], // Validacions camp fPhone
      fEmail: ['', [Validators.required, Validators.email]],            // Validacions camp fEmail
    });
  }

  // Variable per controlar si el formulari s'ha enviat
  submitted = false;

  // Array de pressupostos registrats
  registredBudgets: Budget[] = [];

  // Verifica que l'usuari s'ha enviat amb èxit abans de mostrar-lo. Una variable booleana que s'utilitza per rastrejar si el formulari s'ha enviat amb èxit.
  formSubmittedSuccessfully = false;




  // Funció per obtenir el control del formulari
  serviceSelected(service: any): boolean {
    const index = this.services.indexOf(service);
    const serviceFormArray = this.formBudget.get(
      'serviceFormArray'
    ) as FormArray;
    const serviceFormGroup = serviceFormArray.at(index) as FormGroup;
    return serviceFormGroup.controls['serviceSelected'].value;
  }

  private buildServiceFormArray(): FormArray {
    return this.fb.array(
      this.services.map((service) =>
        this.fb.group({
          serviceSelected: [false],
          numberOfPages:
            service.name === 'Web' ? [0] : [{ value: 0, disabled: true }],

          // Aquest camp només es mostra si el servei és Web
          numberOfLanguages:
            service.name === 'Web' ? [0] : [{ value: 0, disabled: true }],
        })
      )
    );
  }

   // Funció per incrementar pàgines
  incrementPageCount(index: number): void {
    let control = (this.formBudget.get('serviceFormArray') as FormArray)
      .at(index)
      .get('numberOfPages');
    if (control) {
      control.setValue(control.value + 1);

    }
  }

  // Funció per decrementar pàgines
  decrementPageCount(index: number): void {
    let control = (this.formBudget.get('serviceFormArray') as FormArray)
      .at(index)
      .get('numberOfPages');
    if (control && control.value > 0) {
      control.setValue(control.value - 1);
    }
  }

  // Funció per incrementar idiomes
  incrementLanguageCount(index: number): void {
    let control = (this.formBudget.get('serviceFormArray') as FormArray)
      .at(index)
      .get('numberOfLanguages');
    if (control) {
      control.setValue(control.value + 1);
    }
  }

  // Funció per decrementar idiomes
  decrementLanguageCount(index: number): void {
    let control = (this.formBudget.get('serviceFormArray') as FormArray)
      .at(index)
      .get('numberOfLanguages');
    if (control && control.value > 0) {
      control.setValue(control.value - 1);
    }
  }

  // Funció per calcular el preu total
  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.extraPrice = 0; // Reseteja el valor de extraPrice cada vegada que es calcula

    const serviceFormArray = this.formBudget.get('serviceFormArray') as FormArray;
    serviceFormArray.controls.forEach((control, index) => {
      if (control.get('serviceSelected')?.value) {
        totalPrice += this.services[index].price;
        if (this.services[index].name === 'Web') {
          this.extraPrice += (control.get('numberOfPages')?.value)*(control.get('numberOfLanguages')?.value)*30 ;
        }
      }
    });
    // Ara extraPrice s'actualitza directament, així que només retornem totalPrice
    return totalPrice + this.extraPrice;
  }


  // Funció per afegir un pressupost
  addBudget() {
    this.submitted = true;                              // Marca el formulari com a 'intentat d'enviar'

    if (this.formBudget.valid) {
      let servicesDescriptions: string[] = [];
      let totalPrice = this.calculateTotalPrice();

      const servicesControls = (
        this.formBudget.get('serviceFormArray') as FormArray
        ).controls;

        servicesControls.forEach((control, index) => {
          if (control.value.serviceSelected) {
            let description = this.services[index].name;
            let extraDetails = [];
            if (this.services[index].name === 'Web') {
              if (control.value.numberOfPages)
              extraDetails.push(`${control.value.numberOfPages} pàgines`);
            if (control.value.numberOfLanguages)
            extraDetails.push(
          `${control.value.numberOfLanguages} llenguatges`
          );
          description += ` (${extraDetails.join(', ')})`;
        }
        servicesDescriptions.push(description);
      }
    });

    const newBudget: Budget = {
      id: 0,                                        // Aquest valor s'assignarà automàticament i únic
      clientName: this.formBudget.value.fName,
      phone: this.formBudget.value.fPhone,
      email: this.formBudget.value.fEmail,
      serviceName: servicesDescriptions,
      totalPrice: totalPrice,
    };

    this.servicesService.addBudget(newBudget);
    this.formSubmittedSuccessfully = true;
    this.formBudget.reset();
    this.submitted = false;

    }
  }
}
