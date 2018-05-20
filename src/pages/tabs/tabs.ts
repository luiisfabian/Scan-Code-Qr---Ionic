import { GuardadosPage } from './../guardados/guardados';
import { HomePage } from '../index.paginas';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any = HomePage;
  tab2:any = GuardadosPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
