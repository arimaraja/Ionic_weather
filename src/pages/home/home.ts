import { MomentPipe } from './../../pipes/moment/moment';
import { ForcastInterestData, WeatherProvider } from './../../providers/weather/weather';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  result:any;
  climatedata:any;
  dailyforcast:ForcastInterestData;
  WImageData: {
    dayimg: string;
    nightimg: string;
  };
  location: {
    regionkey:number,
    description:string
  };

  constructor(public navCtrl: NavController, private weatherProvider:WeatherProvider) {
    this.result = "OutPut Text";
  }

  //OnInit equal in ionic
  ionViewWillEnter() {
    this.location = {
      regionkey: 206671,
      description:"Chennai"
    };

    this.OnQueryRequest();
  }

  OnQueryRequest() {
    console.log("Change in text");
    
    this.result = "New Text";
    this.weatherProvider.getWeather(this.location.regionkey)
    .subscribe(data=>{
      var tnum="";
      this.result = data;
      this.climatedata = "https://developer.accuweather.com/sites/default/files/03-s.png";
      //console.log(JSON.stringify(data));
      
      this.dailyforcast = data['DailyForecasts'][0];

      if (this.dailyforcast.Day.Icon < 9 ) {
        tnum="0";
      }
      this.WImageData = {
        dayimg : "https://developer.accuweather.com/sites/default/files/" + tnum + this.dailyforcast.Day.Icon +"-s.png",
        nightimg : "https://developer.accuweather.com/sites/default/files/" + this.dailyforcast.Night.Icon+"-s.png"
      }

      console.log(this.dailyforcast);
      Object.keys(data).forEach(key=>{
        if ( key == 'DailyForecasts') {
          if ( Array.isArray(data['DailyForecasts'])) {
            data['DailyForecasts'].forEach(element => {
              Object.keys(element).forEach( items => {
                  if (items == 'Day') {
                    console.log("Day Time");
                    console.log(element[items]);
                  } 
                  else if (items == 'Night') {
                    console.log("Night Time");
                    console.log(element[items]);
                    var iconid = element[items].Icon;
                    
                    this.climatedata = "https://developer.accuweather.com/sites/default/files/" + iconid + "-s.png";
                  }
                }
              );
            });
          } else {
            Object.keys(data['DailyForecasts']).forEach(daykeys=>{
              if (daykeys == '') {
                console.log(key, "Value ", data[daykeys])
              }
            })  
          }
        }
      });
    });
  }
}
