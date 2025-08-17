import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotasComponent } from './quotas/quotas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AtasComponent } from './atas/atas.component';
import { RegrasComponent } from './regras/regras.component';

const routes: Routes = [
    {
        path:'',
        redirectTo:'/quotas',pathMatch:'full'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
