import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {HomePage, MapaPage, HistorialPage, TabsPage, GuardadosPage  } from '../pages/index.paginas';
//PLUGINS
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';



//Maps

import { AgmCoreModule } from '@agm/core';



//providers

import { Historial } from './../providers/historial/Historial';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaPage,
    HistorialPage,
    TabsPage,
    GuardadosPage
  ],
  imports: [
    HttpClientModule, HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAww_C1s2rcCaA9xYjIe0hfAnMSiuU5Rgk'
    }),
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaPage,
    HistorialPage,
    TabsPage,
    GuardadosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Contacts,
    HttpClientModule,
    Historial,
    InAppBrowser,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
