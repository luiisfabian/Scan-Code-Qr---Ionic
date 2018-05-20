import { Component } from '@angular/core';
import { Historial } from './../../providers/historial/Historial';
import { ScanData } from '../../models/scan-data.model';

/**
 * Generated class for the GuardadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {
  historial : ScanData[] = [];
  constructor(private _historialServices:Historial) {
  }

  ionViewDidLoad() {
    this.historial=this._historialServices.cargarHistorial();
  }

  abrirScan(index:number){
    this._historialServices.abrirScan(index);
  }


}
