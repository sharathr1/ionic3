import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ServiceRequest } from '../pages/serviceRequest/servicerequest';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Activities } from '../pages/activities/activities';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, HttpModule } from '@angular/http';
import { ServiceCompoment } from '../pages/httpservice/httpservice';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import { TimeTracker } from '../pages/activities/timetracker/timetracker';
import { RecommendedPart } from '../pages/activities/recommendedPart/recommendedPart';
import { PartTracker } from "../pages/activities/parttracker/parttracker";
import { Tracker } from '../pages/activities/trackers/tracker';
@NgModule({
  declarations: [
    MyApp,
    HomePage, ServiceCompoment,
    ListPage, Activities, TimeTracker, RecommendedPart, PartTracker, Tracker,
    ServiceRequest
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, Activities, TimeTracker, RecommendedPart, PartTracker, Tracker,
    ServiceRequest
  ],
  providers: [
    StatusBar, ServiceRequest, ServiceCompoment,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
