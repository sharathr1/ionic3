import { Component, ErrorHandler } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Activities } from '../activities/activities';
/*import { Observable } from 'rxjs/Observable';
*/
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { ServiceCompoment } from '../httpservice/httpservice';
@Component({
    selector: 'service-service',
    templateUrl: 'service-request.html'

})
export class ServiceRequest {
    //    styleUrls: ['service-request.css']
    actResponse: Observable<any>;

    activities: Array<any>;
    constructor(private _service: ServiceCompoment, private _https: Http, public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
        this.getdata().then(
            (result) => {
                console.log("ok: ", JSON.stringify(result));
                this.activities = this.data.activity;
            }
        );
    }
    data: any
    initializeActivities() {
        //debugger;
        console.log('my activity: ', this.data.activity);
        this.activities = this.data.activity;
    }
    getdata(): Promise<any> {
        let url = "https://stage.api.ge.com:8444/health/itest/v1/serviceRequests/activities?activityStatus=&offset=0&limit=25&SRId=&actType=&actId=&serialNum=&sysId=&actproduct=&custName=&actownerId=";
        return this._service.getService(url).toPromise().then(
            (data) => {
                console.log(data);
                this.data = data;
            }
        );
    }
    itemTapped(event, item) {
        console.log(event, item);
        this.navCtrl.push(Activities, {
            item: item
        });
    }
    getItems(ev) {
        this.initializeActivities();
        var val = ev.target.value;
        if (val.trim() !== '') {
            this.activities = this.activities.filter((item) => {
                console.log(val);
                return item.type.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.status.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.ownerFirstName.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.activityOwner.toString().indexOf(val.toString()) > -1 || item.srId.toString().indexOf(val.toString()) > -1 ||
                    item.issueDescription.toLowerCase().toString().indexOf(val.toString()) > -1;
            })
        }
    }

}
