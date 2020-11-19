import { Component, OnInit, OnDestroy, NgZone, } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-easybutton';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'map-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public selectedSensor: any;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private spinner: NgxSpinnerService,
    private zone: NgZone,
  ) { }

  async ngOnInit() {
    if (localStorage.getItem("tokenLogin") == null) {
      this.router.navigate(['/login'])
    } else {
      this.spinner.show();

      // map init
      const map = L.map('mainmap', {
        worldCopyJump: true,
        center: [45.187965, 5.731230],
        zoom: 13.25
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
      }).addTo(map)

      /*Legend specific*/
      var legend = new L.Control({ position: "bottomleft" })

      legend.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Légende</h4>";
        div.innerHTML += '<img src="../../assets/icon-grey.jpg" width="30" height="25"><span>Capteur</span><br>';
        div.innerHTML += '<img src="../../assets/icon-green.png" width="30" height="25"><span>Capteur avec 1 alerte</span><br>';
        div.innerHTML += '<img src="../../assets/icon-orange.png" width="30" height="25"><span>Capteur avec 2 alertes</span><br>';
        div.innerHTML += '<img src="../../assets/icon-red.png" width="30" height="25"><span>Capteur avec 3 alertes</span><br>';

        return div;
      };

      legend.addTo(map);


      // cluster init
      const cluster = L.markerClusterGroup();

      // all alert init
      const alert = L.markerClusterGroup();

      // init header
      const optionRequete = {
        headers: new HttpHeaders({
          'x-access-token': String(localStorage.getItem("tokenLogin"))
        })
      };

      // init cluster button
      const clusterbutton = L.easyButton('fa-dot-circle', (btn, mMap) => {
        alert.removeFrom(mMap);
        cluster.addTo(mMap);
      }, 'Cluster mode');

      // init alert button
      const alertbutton = L.easyButton('fa-exclamation-triangle', (btn, mMap) => {
        cluster.removeFrom(mMap);
        alert.addTo(mMap);
      }, 'Alert mode');

      clusterbutton.addTo(map);
      alertbutton.addTo(map)

      var iconGrey = L.icon({
        iconUrl: '../../assets/icon-grey.jpg',
        iconSize: [60, 50], // size of the icon
        popupAnchor: [-12, -23] // [x, y]
      });

      var iconRed = L.icon({
        iconUrl: '../../assets/icon-red.png',
        iconSize: [60, 50], // size of the icon
        popupAnchor: [-12, -23] // [x, y]
      });

      var iconOrange = L.icon({
        iconUrl: '../../assets/icon-orange.png',
        iconSize: [60, 50], // size of the icon
        popupAnchor: [-12, -23] // [x, y]
      });

      var iconGreen = L.icon({
        iconUrl: '../../assets/icon-green.png',
        iconSize: [60, 50], // size of the icon
        popupAnchor: [-12, -23] // [x, y]
      });

      var iconColor = [iconGrey, iconGreen, iconOrange, iconRed]

      // api call Alert
      var body = {
        "sort": {
          "alertType": { "$in": ["PM25", "Temperature", "Humidite"] }
        }
      }

      this.http.post<any>(`https://eclisson.duckdns.org/ConnectedCity/getAlerts`, body, optionRequete).subscribe(Response => {
        console.log(Response)
        // iterate on result
        Response.forEach((element: { Sensors: any; alert: any }) => {
          var alertItem = element.alert
          var col = 0
          alertItem.forEach((al: { alertType: string; checked: boolean }) => {
            if (al.alertType != "CO2" && al.checked == false) {
              col++
            }
          })
          // iterate on sensor
          var sensors = element.Sensors[0]
          const marker = L.marker([sensors.lat, sensors.lon], { icon: iconColor[col] })
            .bindPopup(`
            <p>Adresse : ${sensors.address}</p>
            <a href="/details/${sensors.sensorID}">Plus d'information</a>
            `)
          marker.on('click', () => {
            this.selectedSensor = sensors
          });
          alert.addLayer(marker);
        });
      });

      // api call Get all
      this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getSensors`, optionRequete).subscribe(Response => {
        Response.forEach((element: { lat: number; lon: number; address: string; sensorID: string }) => {
          const marker = L.marker([element.lat, element.lon], { icon: iconColor[0] })
            .bindPopup(`
            <p>Adresse : ${element.address}</p>
            <a href="/details/${element.sensorID}">Plus d'information</a>
          `);
          marker.on('click', () => {
            this.selectedSensor = element
          });
          cluster.addLayer(marker);
        });
        this.spinner.hide();
      });

      // add the clusters
      map.addLayer(cluster);
      map.on('click', () => {
        this.selectedSensor = undefined
      })
    }

  }
}