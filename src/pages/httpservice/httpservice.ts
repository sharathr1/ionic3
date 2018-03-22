import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
declare var jquery: any;
declare var $: any;
//"jquery": "^3.2.1", 

@Injectable()
@Component({
    selector: 'service-http-data',
    templateUrl: 'service-http.html'
})
export class ServiceCompoment {
    errorMsg: any;
    output: any;
    token: any;
    constructor(private _https: Http) {

    }
    refreshToken() {
        let url = "https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=client_credentials&client_id=GEHC_SiebelIntl_Services_2L_Client&client_secret=88fjqSB6V0nIuY4a9lmAn1oNARIggdaQAuFtvZKobxlxvEGhmpg41kAxgHKWoiS3&scope=GEHC_SiebelIntl_Services_2L_API";
        return this._https.get(url).map((res) => res)
            .map(
            (data) => {
                console.log("this.output =", data.json());
                return data.json();
            },
            (error) => {
                console.log("Error ", error);
                return this.handleError(error);
            }
            );
    }
    createAuthorizationHeader(headers: Headers) {
        //  https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=client_credentials&client_id=GEHC_SiebelIntl_Services_2L_Client&client_secret=88fjqSB6V0nIuY4a9lmAn1oNARIggdaQAuFtvZKobxlxvEGhmpg41kAxgHKWoiS3&scope=GEHC_SiebelIntl_Services_2L_API

        headers.append('Authorization', 'bearer wNUoR7XVpkJbe8TnXm9ZgsR9chvo');
        //    headers.append('Access-Control-Allow-Origin', 'Origin, Content-Type, X-Auth-Token');
        //  headers.append('Access-Control-Allow-Origin', '*');
        //   headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('X-SSO_ID', '305009040');


    }
    getService(url): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers)
        return this._https.get(url, {
            headers: headers
        }).map((res) => res)
            .map(
            (data) => {
                console.log("this.output =", data.json());
                return data.json();
            },
            (error) => {
                console.log("Error ", error);
                return this.handleError(error);
            }
            );
    }
    private handleError(error: any) {
        let msg = 'Oops... Something went wrong!!!';
        switch (error.status) {
            case 400:
                msg = 'Not Found';
                break;
            case 404:
                msg = 'Bad Request...';
                break;
            case 403:
            case 401:
                msg = 'Oops... Something might have broken!!! Try to refresh your browser.';
                break;
            case 500:
                msg = 'Server Error!!!';
            default:
                msg = 'Error : ' + (error.status ? error.status : '') + '!!!';
        }
    }
}