import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { QuotasComponent } from './quotas/quotas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { AtasComponent } from './atas/atas.component';
import { RegrasComponent } from './regras/regras.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { ShowDayDialogComponent } from './show-day-dialog/show-day-dialog.component'

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'quotas',
        component: QuotasComponent
    },
    {
        path:'calendario',
        component: CalendarioComponent
    },
    {
        path:'perfil',
        component: PerfilComponent
    },
    {
        path:'atas',
        component: AtasComponent
    },
    {
        path:'regras',
        component: RegrasComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    QuotasComponent,
    CalendarioComponent,
    NotificacoesComponent,
    AtasComponent,
    RegrasComponent,
    HomeComponent,
    ShowDayDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    
    MatExpansionModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }