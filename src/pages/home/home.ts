import { Component } from '@angular/core';
import {NavController } from 'ionic-angular';

//pugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//
//COMPONENTS
import { ToastController, Platform } from 'ionic-angular';
//
//SERVICIOS o providers
import { Historial } from '../../providers/historial/Historial';
//
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController,
    private plt: Platform, private _historialService:Historial) {

  }

  scan(){
    console.log("realizando Scan...")
    if (!this.plt.is('cordova')) {
      this._historialService.agregarHistorial("http://google.com/");
      this._historialService.agregarHistorial("geo:6.2494141999999995,-75.6345714");
      this._historialService.agregarHistorial(`BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );
      this._historialService.agregarHistorial('MATMSG:TO:fernando.herrera85@gmail.com;SUB:Hola Mundo;BODY:Saludos Fernando;;');
      return;
    }
    this.barcodeScanner.scan().then((barcodeData:any) => {

      console.log("Resultado:" + barcodeData.text );
      console.log("Formato:" + barcodeData.format);
      console.log("Cancelado" + barcodeData.cancelled);
      if( barcodeData.cancelled == 0 && barcodeData.text != null ){
        this._historialService.agregarHistorial( barcodeData.text  );
      }

     }).catch(err => {
         console.log('Error', err);
         this.mostrarError("error" + err);
     });
  }

  mostrarError(mensaje:string){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });

    toast.present();
  }

}
