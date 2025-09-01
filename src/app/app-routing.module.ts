import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotasComponent } from './quotas/quotas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AtasComponent } from './atas/atas.component';
import { RegrasComponent } from './regras/regras.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
    {path: '', canActivate:[AuthGuard], children:[
            {
                path:'',
                redirectTo:'/login',pathMatch:'full'
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
            /*
            {
                path:'atas',
                component: AtasComponent
            },*/
            {
                path:'regras',
                component: RegrasComponent
            },
            {
                path:'admin',
                component: AdminComponent,
                canActivate:[AuthorizationGuard]
            }
        ]
    },
    {
        path:'login',
        component: LoginComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
