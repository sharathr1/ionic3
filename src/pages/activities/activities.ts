import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceCompoment } from '../httpservice/httpservice';
import { TimeTracker } from './timetracker/timeetracker';
import { RecommendedPart } from './recommendedPart/recommendedPart';
import { PartTracker } from './parttracker/parttracker';

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class Activities {
  selectedItem: any;
  activityitems: Array<{ icon: string, title: string, component: string, size: number }>;
  activityDetail = [];
  constructor(private _service: ServiceCompoment, public navCtrl: NavController, public navParams: NavParams) {
    this.activityDetail.push({
      icon: 'wifi',
      title: 'Time Trackers ',
      component: 'TimeTracker'
    }, {
        icon: 'wifi',
        title: 'Part Tracker ',
        component: 'PartTracker'
      },
      {
        icon: 'wifi',
        title: 'Recommended Part ',
        component: 'RecommendedPart',
      });
    this.selectedItem = navParams.get('item');
    this.getdata();
  }
  activityDetails: any;
  getdata(): Promise<any> {
    let url = "https://stage.api.ge.com:8444/health/itest/v1/serviceRequests/activities/" + this.selectedItem.activityId;
    return this._service.getService(url).toPromise().then(
      (data) => {
        console.log(data);
        let timeTrackerL = data.activityDetails.timeTracker.length;
        let partTrackerL = data.activityDetails.partTracker.length;
        let recommendedPartL = data.activityDetails.recommendedPart.length;
        this.updateActivityDetail(timeTrackerL, partTrackerL, recommendedPartL);
        this.activityDetails = data.activityDetails;
      }
    );
  }
  updateActivityDetail(tl, pl, rpl) {
    /*this.activityDetail = []
    this.activityDetail.push({
      icon: 'wifi',
      title: 'Time Trackers ',
      component: 'TimeTrackers',
      size: tl
    },
      {
        icon: 'wifi',
        title: 'Recommended Part ',
        component: 'RecommendedPart',
        size: pl
      });*/

    this.activityDetail[0].size = tl;
    this.activityDetail[1].size = pl;
    this.activityDetail[2].size = rpl;

  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log("Tapped ", item, item.component)

    if (item.component == "TimeTracker") {
      item = this.activityDetails.timeTracker;
      this.navCtrl.push(TimeTracker, {
        item: item
      });
    } else if (item.component == "PartTracker") {
      item = this.activityDetails.partTracker;
      this.navCtrl.push(PartTracker, {
        item: item
      });
    } else if (item.component == "RecommendedPart") {
      item = this.activityDetails.recommendedPart;
      this.navCtrl.push(RecommendedPart, {
        item: item
      });
    }

    console.log("Tapped item", item);

  }
}
