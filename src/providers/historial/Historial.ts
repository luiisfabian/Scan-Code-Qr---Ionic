import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// Importamos el array para tipo scandata
import { ScanData } from "../../models/scan-data.model";

//in app Browser (native)
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

//modal

import { ModalController, Platform, ToastController } from "ionic-angular";
import { MapaPage } from "./../../pages/mapa/mapa";



/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Historial {
  private _historial: ScanData[] = [];

  constructor(
    public http: HttpClient,
    private iab: InAppBrowser,
    private modalController: ModalController,
    private contacts: Contacts,
    private platform: Platform,
    private toastCtrl: ToastController,
    private emailComposer: EmailComposer
  ) {}

  agregarHistorial(texto: string) {
    let data = new ScanData(texto);
    this._historial.unshift(data);

    console.log(this._historial);
    this.abrirScan(0);
  }

  cargarHistorial() {
    return this._historial;
  }

  crearContacto(texto: string){
    let campos:any = this.parse_vcard(texto);
    // console.log(campos);
    // console.log("hola",campos.tel[0].value[0]);
  let nombre = campos.fn;
    let tel = campos.tel[0].value[0];
    // let TEL = campos.TEL;
    // console.log(TEL);

    if (!this.platform.is('cordova')) {
      console.warn("Estoy en la computadora");
      return;

    }
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre );
    contact.phoneNumbers = [ new ContactField('mobile', tel ) ];
    contact.save().then(
      () => this.crearToast("contacto "+ nombre + "Creado"),
      (error)=>this.crearToast("error"+ error)
    )
  }

 crearToast( mensaje: string ){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    }).present();

  }

  parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

private enviarCorreo(texto:string ){
    let arr1 = texto.split(";");
    let arr2 = arr1[0].split(":");
    let arr3 = arr1[1].split(":");
    let arr4 = arr1[2].split(":");
    let destinatario = arr2[2];
    let asunto = arr3[1];
    let cuerpo = arr4[1];
    if( !this.platform.is('cordova') ){
      console.warn('Estoy en la computadora, no puedo enviar email');
      console.log( destinatario, asunto, cuerpo )
      return;
    }
    this.emailComposer.isAvailable().then((available: boolean) =>{
     if(available) {
       //Now we know we can send
     }
    });
    let email = {
      to: destinatario,
      cc: '',
      bcc: [],
      attachments: [],
      subject: asunto,
      body: cuerpo,
      isHtml: true
    };
    // Send a text message using default options
    this.emailComposer.open(email);
  }



abrirScan(index: number) {
    let scanData = this._historial[index];
    console.log(scanData);

    switch (scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system");
        break;
      case "mapa":
        this.modalController
          .create(MapaPage, { coords: scanData.info })
          .present();
        break;
      case "contacto":
        this.crearContacto(scanData.info);
        break;
      case "email":
        this.enviarCorreo(scanData.info);
      break;
      default:
        console.log("EROORRRRR");
        break;
    }
  }
}
