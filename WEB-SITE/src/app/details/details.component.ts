import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  @Input() sensoridcomponent: String = "";
  public sensorid: String = "";

  public time: any = ["Time"];
  public humidity_data: any = ["humidity"];
  public C02_data: any = ["C02"]
  public PM25_data: any = ["PM25"]
  public temp_data: any = ["temperature"]

  async ngOnInit() {
    if (localStorage.getItem("tokenLogin") == null) {
      this.router.navigate(['/login'])
    } else {
      //this is executed one on the init but shoudlm be executed everythime we click
      this.spinner.show();
      if (this.sensoridcomponent === "") { // if we do not load it as a component but as a page
        await this.route.params.subscribe(async params => {
          this.sensorid = params['sensorid'];
        });
      }
      else {
        this.sensorid = this.sensoridcomponent;
      }

      const optionRequete = {
        headers: new HttpHeaders({
          'x-access-token': String(localStorage.getItem("tokenLogin"))
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
            this.time.push(new Date(parseInt(element.time)))
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
            ],
            colors: {
              Time: '#541c1d',
              temperature: '#541c1d',
            },
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
            x: 'Time',
            columns: [
              this.time,
              this.humidity_data
            ],
            colors: {
              Time: '#541c1d',
              humidity: '#541c1d',
            },
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
        let chartco2 = c3.generate({
          bindto: '#chartco2',
          data: {
            x: 'Time',
            columns: [
              this.time,
              this.C02_data
            ],
            colors: {
              Time: '#541c1d',
              C02: '#541c1d',
            },
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
        let chartpm25 = c3.generate({
          bindto: '#chartpm25',
          data: {
            x: 'Time',
            columns: [
              this.time,
              this.PM25_data
            ],
            colors: {
              Time: '#541c1d',
              PM25: '#541c1d',
            },
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
        this.spinner.hide();

      });
    }

  }
}