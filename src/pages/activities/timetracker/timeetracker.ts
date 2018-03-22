import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceCompoment } from '../../httpservice/httpservice';

@Component({
    selector: 'page-timetracker',
    templateUrl: 'timetracker.html'
})
export class TimeTracker {
    selectedItem: any;
    timeTracker: Array<{ ID: string, labourType: string, startTime: string, srCurrencyCode: string }>;

    constructor(private _service: ServiceCompoment, public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('item');
        console.log("Time tracker ", this.selectedItem);
        this.timeTracker = this.selectedItem;
    }
    keys: any;
    getKeys(data) {
        this.keys = Object.keys(data);
        return true;
    }
}