import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceCompoment } from '../../httpservice/httpservice';

@Component({
    selector: 'page-tracker',
    templateUrl: 'tracker.html'
})
export class Tracker {
    selectedItem: any;
    tracker: Array<{ ID: string, labourType: string, startTime: string, srCurrencyCode: string }>;

    constructor(private _service: ServiceCompoment, public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('item');
        console.log("tracker ", this.selectedItem);
        this.tracker = this.selectedItem;
    }
    keys: any;
    getKeys(data) {
        this.keys = Object.keys(data);
        return true;
    }
}