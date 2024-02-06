

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})


export class WelcomeComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}


