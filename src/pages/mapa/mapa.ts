import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  lat: number;
  lng: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
    // this.lat= 6.2494141999999995;
    // this.lng= -75.6345714;

    let coordsArray = this.navParams.get("coords").split(",");
    this.lat= Number( coordsArray[0].replace("geo",""));
    this.lng =Number( coordsArray[1]);

    

   console.log(this.navParams.get("coords"));
   console.log(this.lat, this.lng);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }
  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

}
