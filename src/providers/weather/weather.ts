import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
  apikey = "zZkB2HPM8STIAf4m8cqqOFa68iXmU9lD";
  url:any;
  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');

    this.url = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
  }

  getWeather(keyid) {
//    2801671?apikey=zZkB2HPM8STIAf4m8cqqOFa68iXmU9lD
    var reqUrl = `${this.url}${keyid}?apikey=${this.apikey}`;
    return this.http.get(reqUrl)
            .map(res=>res);
  }

}
