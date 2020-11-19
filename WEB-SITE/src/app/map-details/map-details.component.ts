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
          ['data', this.nbAlert]
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
  }

  async ngOnChanges(changes: SimpleChanges) {
    let token = await this.getToken();

    // init header
    console.log('token', token)
    const optionRequete = {
      headers: new HttpHeaders({
        'x-access-token': token.token
      })
    };

    await this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getStats`, optionRequete).subscribe(Response => {
      console.log(Response)
      this.nbSensor = Response.sensorsCount
      this.nbRawData = Response.rawDataCount
      this.nbAlert = Response.alertsCount
    });

    if (this.selectedSensor != undefined) {
      this.sensorID = this.selectedSensor.sensorID
      this.address = this.selectedSensor.address
    }
    this.createGauges()
  }
}
