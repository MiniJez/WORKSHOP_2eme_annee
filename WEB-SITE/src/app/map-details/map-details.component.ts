import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as c3 from 'c3';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css']
})
export class MapDetailsComponent implements OnInit {

  constructor(
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }
  public sensorID: String = "";
  public address: String = "";
  public nbSensor: number = 0;
  public nbRawData: number = 0;
  public nbAlert: number = 0;
  public alertCheckedCount: number = 0;
  //indiv charts 
  public chartppm25: any;
  public charthumi: any;
  public charttemp: any;
  public chartco2: any;

  public selectedSensorStats: any = {
    "temp": 0,
    "humidity": 0,
    "C02": 0,
    "PM25": 0
  };

  @Input() selectedSensor: any;

  ngOnInit() {
  }

  createGauges() {
    var chartAlert = c3.generate({
      bindto: '#chartAlert',
      data: {
        columns: [
          ['Pourcentage de capteurs avec alerte(s)', (this.nbAlert / this.nbSensor) * 100]
        ],
        type: 'gauge',
      },
      color: {
        pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          max: 100, // 100 is default
          values: [20, 40, 60, 80]
        }
      },
      size: {
        height: 180
      }
    });

    var chartAlertResolved = c3.generate({
      bindto: '#chartAlertResolved',
      data: {
        columns: [
          ['Pourcentage d\'alertes résolus', ((this.nbAlert - this.alertCheckedCount) / this.nbAlert) * 100]
        ],
        type: 'gauge',
      },
      color: {
        pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          max: 100, // 100 is default
          values: [20, 40, 60, 80]
        }
      },
      size: {
        height: 180
      }
    });

    this.charttemp = c3.generate({
      bindto: '#charttemp',
      data: {
        columns: [
          ['Temperature', parseInt(this.selectedSensorStats.temp)]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: true // to turn off the min/max labels.
        },
        min: -10, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 50, // 100 is default
        units: ' °C',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: '°C', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
    this.charthumi = c3.generate({
      bindto: '#charthumi',
      data: {
        columns: [
          ['Humidity', parseInt(this.selectedSensorStats.humidity)]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: true // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100, // 100 is default
        units: ' %',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: '%', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
    this.chartco2 = c3.generate({
      bindto: '#chartco2',
      data: {
        columns: [
          ['CO2', parseInt(this.selectedSensorStats.C02)]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: true // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 5000, // 100 is default
        units: ' PPM',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'PPM', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
    this.chartppm25 = c3.generate({
      bindto: '#chartppm25',
      data: {
        columns: [
          ['Particules', parseInt(this.selectedSensorStats.PM25)]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: true // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 500, // 100 is default
        units: ' PPM',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'PPM', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
  }

  async getStats() {
    // init header
    const optionRequete = {
      headers: new HttpHeaders({
        'x-access-token': String(localStorage.getItem("tokenLogin"))
      })
    };
    return this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getStats`, optionRequete).toPromise()
  }


  async getStatsForSensor() {
    // init header
    const optionRequete = {
      headers: new HttpHeaders({
        'x-access-token': String(localStorage.getItem("tokenLogin"))
      })
    };
    return this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getLatestRawData/` + this.sensorID, optionRequete).toPromise();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (localStorage.getItem("tokenLogin") == null) {
      this.router.navigate(['/login'])
    } else {
      let stats = await this.getStats();
      console.log(stats)
      this.nbSensor = stats.sensorsCount
      this.nbRawData = stats.rawDataCount
      this.nbAlert = parseInt(stats.totalAlertsCount[0].count + stats.totalAlertsCount[1].count)
      this.alertCheckedCount = parseInt(stats.totalAlertsCount[1].count)

      if (this.selectedSensor != undefined) {
        this.sensorID = this.selectedSensor.sensorID
        this.address = this.selectedSensor.address
        this.selectedSensorStats = await this.getStatsForSensor();
        console.log(this.selectedSensorStats)
        this.charttemp.load({
          // unload: true,
          columns: ['Temperature', parseInt(this.selectedSensorStats.temp)]
        });
        this.charthumi.load({
          // unload: true,
          columns: ['Humidity', parseInt(this.selectedSensorStats.humidity)]
        });
        this.charthumi.load({
          // unload: true,
          columns: ['CO2', parseInt(this.selectedSensorStats.C02)]
        });
        this.chartppm25.load({
          //unload: true,
          columns: ['Particules', parseInt(this.selectedSensorStats.PM25)]
        });
      }
      /*  await this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getRawData/` + this.selectedSensor.sensorID, optionRequete).subscribe(Response => {
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
          this.spinner.hide();
    
        });*/
      this.createGauges()
    }
  }
}
