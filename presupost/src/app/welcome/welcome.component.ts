import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

interface Precios {
  [key: string]: number;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  checkBoxForm: FormGroup;
  total = 0;
  precios: Precios = {
    seo: 300,
    ads: 400,
    web: 500,
  };

  constructor(private formBuilder: FormBuilder) {
    this.checkBoxForm = this.formBuilder.group({
      checkboxSeo: [false],
      checkboxAds: [false],
      checkboxWeb: [false],
    });
  }

  ngOnInit() {
    this.checkBoxForm.valueChanges.subscribe((val) => {
      this.total = 0;
      for (const key in val) {
        if (val[key]) {
          this.total += this.precios[key.replace('checkbox', '').toLowerCase()];
        }
      }
    });
  }

  onSubmit() {
    console.log(this.checkBoxForm.value);
  }
}
