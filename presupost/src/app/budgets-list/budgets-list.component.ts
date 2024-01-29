import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetsListComponent { }
