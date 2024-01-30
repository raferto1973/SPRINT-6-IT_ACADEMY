import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';

interface Servicio {
  nombre: string;
  descripcion: string;
  precio: number;
  checkbox: string;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PanelComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  checkBoxForm: FormGroup;
  total = 0;
  servicios: Servicio[] = [
    { nombre: 'Seo', descripcion: 'Programació d\'una web responsive completa.', precio: 300, checkbox: 'checkboxSeo' },
    { nombre: 'Ads', descripcion: 'Programació d\'una web responsive completa.', precio: 400, checkbox: 'checkboxAds' },
    { nombre: 'Web', descripcion: 'Programació d\'una web responsive completa.', precio: 500, checkbox: 'checkboxWeb' },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.checkBoxForm = this.formBuilder.group({
      checkboxSeo: [false],
      checkboxAds: [false],
      checkboxWeb: [false],
      numPagines: [1, Validators.min(1)],
      numIdiomes: [1, Validators.min(1)]
    });
  }

  ngOnInit() {
    this.checkBoxForm.valueChanges.subscribe((val) => {
      this.total = 0;
      for (const servicio of this.servicios) {
        if (val[servicio.checkbox]) {
          this.total += servicio.precio;
        }
      }
    });
  }

  onSubmit() {
    console.log(this.checkBoxForm.value);
  }
}
