import {  Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CalendrierComponent } from "./calendrier/calendrier.component";
import { ProfileComponent } from "./profile/profile.component";
import { FeedbacksComponent } from "./feedbacks/feedbacks.component";
import { RessourcesComponent } from "./ressources/ressources.component";
import { HistoriqueComponent } from "./historique/historique.component";


export const STUDENT_ROUTES : Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component:DashboardComponent,
        children: [
            { path: 'calendrier', component: CalendrierComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'feedbacks', component: FeedbacksComponent },
            { path: 'ressources', component: RessourcesComponent },
            { path: 'historique', component: HistoriqueComponent },
            { path: '', redirectTo: 'calendrier', pathMatch: 'full' }
          ]
    }, 
    { path: '**', redirectTo: 'dashboard' }
]