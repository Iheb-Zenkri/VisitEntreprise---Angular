import {  Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CompanyComponent } from "./company/company.component";
import { VisitComponent } from "./visit/visit.component";


export const ADMIN_ROUTES : Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component :DashboardComponent,
        children: [
            {path : 'gestion-entreprises',component :CompanyComponent},
            {path : 'gestion-visites' , component: VisitComponent},
            { path: '', redirectTo: 'gestion-visites', pathMatch: 'full' }
        ]
    }, 
    { path: '**', redirectTo: 'dashboard' }
   
]