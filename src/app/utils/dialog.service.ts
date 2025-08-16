import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  getGenericDialogConfig(){
    let dialogConfig: MatDialogConfig = {};
    // Usamos as suas próprias media queries. O 'Handset' padrão do CDK funciona bem para telemóveis.
    const isHandset = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isTablet = this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 1400px)');
    const isDesktop = !isHandset && !isTablet;

    if (isHandset) {
      // Telemóveis
      dialogConfig = {
        width: '90vw',
        maxWidth: 'none',
      };
    } else if (isTablet) {
      // Tablets (iPad)
      dialogConfig = {
        width: '60vw',
        maxWidth: 'none'
      };
    } else if (isDesktop) {
      // Desktops
      dialogConfig = {
        width: '60vw',
        maxWidth: '800px' // Um limite máximo pode ser útil
      };
    } else {
      // Caso padrão (fallback)
      dialogConfig = {
        width: '600px'
      };
    }
    return dialogConfig
}

}
