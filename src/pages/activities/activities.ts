import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceCompoment } from '../httpservice/httpservice';
import { TimeTracker } from './timetracker/timetracker';
import { RecommendedPart } from './recommendedPart/recommendedPart';
import { PartTracker } from './parttracker/parttracker';
import { Tracker } from './trackers/tracker';

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
      },
      {
        icon: 'wifi',
        title: 'Expense Tracker',
        component: 'ExpenseTracker',
      },
      {
        icon: 'wifi',
        title: 'ActivityNotes Tracker',
        component: 'ActivityNotesTracker',
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
        let expenseTrackerL = data.activityDetails.expenseTracker.length;
        let activityNotesTrackerL = data.activityDetails.activityNotesTracker.length;
        let toolTrackerL = data.activityDetails.toolTracker.length;
        this.updateActivityDetail(timeTrackerL, partTrackerL, recommendedPartL, expenseTrackerL, activityNotesTrackerL);
        this.activityDetails = data.activityDetails;
      }
    );
  }
  updateActivityDetail(tl, pl, rpl, el, al) {
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
    this.activityDetail[3].size = el;
    this.activityDetail[4].size = al;

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
    } else if (item.component == "ExpenseTracker") {
      item = this.activityDetails.expenseTracker;
      this.navCtrl.push(RecommendedPart, {
        item: item
      });
    } else {
      let component = item.title;
      item = this.activityDetails.activityNotesTracker;
      item.title = component;
      this.navCtrl.push(Tracker, {
        item: item
      });
    }

    console.log("Tapped item", item);

  }
}
