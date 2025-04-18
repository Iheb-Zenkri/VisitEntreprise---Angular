import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'NavItem',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input() label: string = "";       
  @Input() isActive: boolean = false;
  @Input() faClass: string ="";
  @Input() routerLink: string = "";

  constructor() {}


}

