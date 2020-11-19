import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  ) { }
  public sensorID: String = "";
  public address: String = "";
  public nbSensor: number = 0;
  public nbRawData: number = 0;
  public nbAlert: number = 0;
  @Input() selectedSensor: any;


  ngOnInit() {
  }

  async getToken() {
    var email = "edouard.clisson@epsi.fr"
    var pswd = "test"
    var body = { "email": email, "password": pswd }
    return this.http.post<any>(`https://eclisson.duckdns.org/ConnectedCity/login`, body).toPromise();
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
    var charttemp = c3.generate({
      bindto: '#charttemp',
      data: {
        columns: [
          ['Temperature', Math.floor(Math.random() * 50) + 1]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: false // to turn off the min/max labels.
        },
        min: -10, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 50, // 100 is default
        units: ' °C',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
    var charthumi = c3.generate({
      bindto: '#charthumi',
      data: {
        columns: [
          ['Humidity', Math.floor(Math.random() * 100) + 1]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100, // 100 is default
        units: ' %',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
    var chartco2 = c3.generate({
      bindto: '#chartco2',
      data: {
        columns: [
          ['CO2', Math.floor(Math.random() * 5000) + 1]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 5000, // 100 is default
        units: ' PPM',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
    var chartppm25 = c3.generate({
      bindto: '#chartppm25',
      data: {
        columns: [
          ['Particules fines', Math.floor(Math.random() * 500) + 1]
        ],
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 500, // 100 is default
        units: ' PPM',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
  }

  async getStats(token: { token: any; }) {
    // init header
    const optionRequete = {
      headers: new HttpHeaders({
        'x-access-token': token.token
      })
    };
    return this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getStats`, optionRequete).toPromise()
  }

  async ngOnChanges(changes: SimpleChanges) {
    let token = await this.getToken();
    let stats = await this.getStats(token);

    this.nbSensor = stats.sensorsCount
    this.nbRawData = stats.rawDataCount
    this.nbAlert = stats.alertsCount

    if (this.selectedSensor != undefined) {
      this.sensorID = this.selectedSensor.sensorID
      this.address = this.selectedSensor.address
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
