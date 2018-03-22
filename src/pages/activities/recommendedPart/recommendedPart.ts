import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceCompoment } from '../../httpservice/httpservice';

@Component({
    selector: 'page-recommendedPart',
    templateUrl: 'recommendedPart.html'
})
export class RecommendedPart {
    selectedItem: any;
    recommendedPart: Array<{ ID: string, labourType: string, startTime: string, srCurrencyCode: string }>;

    constructor(private _service: ServiceCompoment, public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('item');
        console.log("Part tracker ", this.selectedItem);
        this.recommendedPart = this.selectedItem;
    }
    keys: any;
    getKeys(data) {
        this.keys = Object.keys(data);
        return true;
    }
}