import { WeatherProvider } from './../../providers/weather/weather';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result:any;
  climatedata:any;
//  imagedata:any;

  constructor(public navCtrl: NavController, private weatherProvider:WeatherProvider) {
    this.result = "OutPut Text";
  }

  OnQueryRequest() {
    console.log("Change in text");
    this.result = "New Text";
    this.weatherProvider.getWeather(206671)
    .subscribe(data=>{
      this.result = data;
      this.climatedata = "https://developer.accuweather.com/sites/default/files/03-s.png";
      console.log(JSON.stringify(data));

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

      /*
      JSON.parse(JSON.stringify(data['DailyForecasts']), (key,value)=>{
          if (key == "") {
            console.log("" + key + value );
          }
      })*/
    });
  }
}
