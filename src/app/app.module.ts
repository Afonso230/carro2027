import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { QuotasComponent } from './quotas/quotas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AtasComponent } from './atas/atas.component';
import { RegrasComponent } from './regras/regras.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { ShowDayDialogComponent } from './show-day-dialog/show-day-dialog.component'
import localePt from '@angular/common/locales/pt-PT'
import { registerLocaleData } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { firebaseConfig } from './environment/firebase.environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {MatButtonModule} from '@angular/material/button';
registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    QuotasComponent,
    CalendarioComponent,
    AtasComponent,
    RegrasComponent,
    HomeComponent,
    ShowDayDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    
    AngularFireModule.initializeApp(firebaseConfig),

    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT'
    },

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }