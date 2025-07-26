import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importe RouterModule e Routes

import { AppRoutingModule } from './app-routing.module'; // Mantenha se ainda usa para outras coisas
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { QuotasComponent } from './quotas/quotas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { AtasComponent } from './atas/atas.component';
import { RegrasComponent } from './regras/regras.component';
import { HomeComponent } from './home/home.component';

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }