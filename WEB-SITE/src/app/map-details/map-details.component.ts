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
          ['Pourcentage d\'alertes non résolus', ((this.nbAlert - this.alertCheckedCount) / this.nbAlert) * 100]
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

      var totalAlertsCount = stats.totalAlertsCount
      totalAlertsCount.forEach((item: any) => {
        if (item._id == true) {
          this.alertCheckedCount = item.count
        }
      })
      this.nbAlert = parseInt(stats.totalAlertsCount[0].count + stats.totalAlertsCount[1].count)
      this.createGauges()
      if (this.selectedSensor != undefined) {
        this.sensorID = this.selectedSensor.sensorID
        this.address = this.selectedSensor.address
        await this.getStatsForSensor().then((res) => {
          this.selectedSensorStats = res[0];
          this.charttemp = c3.generate({
            bindto: '#charttemp',
            data: {
              columns: [
                ['Temperature', parseFloat(this.selectedSensorStats.temp)]
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
              pattern: ['#4B6ADC', '#60B044', '#F97600', '#FF0000'], // the three color levels for the percentage values.
              threshold: {
                unit: '°C', // percentage is default
                max: 50, // 100 is default
                values: [18, 25, 30, 50]
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
                ['Humidity', parseFloat(this.selectedSensorStats.humidity)]
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
              pattern: ['#F97600', '#60B044', '#4B6ADC'], // the three color levels for the percentage values.
              threshold: {
                unit: '%', // percentage is default
                max: 100, // 100 is default
                values: [40, 60, 100]
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
              pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
              threshold: {
                values: [1000, 2000, 3000, 5000]
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
              units: ' µg/m^3',
              width: 39 // for adjusting arc thickness
            },
            color: {
              pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
              threshold: {
                values: [12, 55, 150, 500]
              }
            },
            size: {
              height: 180
            }
          });
        });
      }
    }
  }
}