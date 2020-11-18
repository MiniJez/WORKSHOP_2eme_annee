import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import * as c3 from 'c3';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }
  public sensorid: String = "";

  public time: any = ["Time"];
  public humidity_data: any = ["humidity"];
  public C02_data: any = ["C02"]
  public PM25_data: any = ["PM25"]
  public temp_data: any = ["temperature"]
  //TOOD : change me
  async getToken() {
    var email = "edouard.clisson@epsi.fr"
    var pswd = "test"
    var body = { "email": email, "password": pswd }
    return this.http.post<any>(`https://eclisson.duckdns.org/ConnectedCity/login`, body).toPromise();
  }

  async ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(async params => {

      this.sensorid = params['sensorid'];
      console.log(this.sensorid);

      let token = await this.getToken();

      const optionRequete = {
        headers: new HttpHeaders({
          'x-access-token': token.token
        })
      };

      await this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getRawData/` + this.sensorid, optionRequete).subscribe(Response => {
        console.log(Response.length)
        let v = 0
        let i = 1;
        if (Response.length > 5000) {
          i = 2
        }
        if (Response.length > 10000) {
          i = 3
        }

        Response.forEach((element: { humidity: string; C02: string; PM25: string; temp: string; time: any }) => {
          if (v / 3 != 0) {
            console.log("raw : " + element.time)//1605713609768
            var d = new Date(element.time);
            console.log("converted : " + d)
            var f = new Date(element.time).toLocaleString()
            console.log("test : " + f)

            // this.time.push(d.toGMTString());
            this.time.push(d)
            this.humidity_data.push(parseFloat(element.humidity));
            this.C02_data.push(parseInt(element.C02));
            this.PM25_data.push(parseInt(element.PM25));
            this.temp_data.push(parseFloat(element.temp));
          }
          v++;
        });
        console.log(this.humidity_data);
        console.log(Response.length / i)

        let charttemp = c3.generate({
          bindto: '#charttemp',
          data: {
            x: 'Time',
            columns: [
              this.time,
              this.temp_data
            ]
          },
          subchart: {
            show: true
          },
          axis: {
            x: {
              type: "timeseries",
              tick: {
                fit: true,
                format: '%Y-%m-%d %H:%M:%S'
              }
            }
          }
        });
        let charthumi = c3.generate({
          bindto: '#charthumi',
          data: {
            columns: [
              this.humidity_data
            ]
          }
        });
        let chartco2 = c3.generate({
          bindto: '#chartco2',
          data: {
            columns: [
              this.C02_data
            ]
          }
        });
        let chartpm25 = c3.generate({
          bindto: '#chartpm25',
          data: {
            columns: [
              this.PM25_data
            ]
          }
        });
        this.spinner.hide();
      });
    });
  }
}