import { TokenService } from './../../../core/services/token.service';
import { Component } from '@angular/core';
import { SideBarComponent } from "../../../components/side-bar/side-bar.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavItemComponent } from "../../../components/nav-item/nav-item.component";
import { filter } from 'rxjs';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideBarComponent, RouterOutlet, NavItemComponent,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    activeLabel: string = 'gestion-visites';
  
    currentPath: string = '';
  
    constructor(private router: Router) {
      this.currentPath = router.url;
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.urlAfterRedirects;
      });
    }
  
    isActive(path: string): boolean {
      return this.currentPath.includes(path);
    }
}
