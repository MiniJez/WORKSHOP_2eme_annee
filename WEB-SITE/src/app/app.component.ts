import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-easybutton';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  getToken() {
    var email = "edouard.clisson@epsi.fr"
    var pswd = "test"
    var body = { "email": email, "password": pswd }
    this.http.post<any>(`https://eclisson.duckdns.org/ConnectedCity/login`, body).subscribe(Response => {
      return Response.token
    });
    return ''
  }

  ngOnInit() {

    var token = this.getToken()

    // map init
    const map = L.map('mainmap', {
      worldCopyJump: true,
      center: [45.187965, 5.731230],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    }).addTo(map)

    // cluster init
    const cluster = L.markerClusterGroup();

    // all alert init
    const alert = L.markerClusterGroup();
    console.log(token)
    var header = new HttpHeaders()
    header.append("x-access-token", token)

    // init cluster button
    const clusterbutton = L.easyButton('fa-dot-circle', (btn, mMap) => {
      // api call
      this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getSensors`, { headers: header }).subscribe(Response => {
        Response.forEach((element: { lat: number; lon: number; }) => {
          const marker = L.marker([element.lat, element.lon])
          cluster.addLayer(marker);
        });
      });
    }, 'Cluster mode');

    // init alert button
    const alertbutton = L.easyButton('fa-exclamation-triangle', (btn, mMap) => {
      var body = { "sort": { "Temperature": "Il fait trop froid : isolez vos murs" } }
      this.http.post<any>(`https://eclisson.duckdns.org/ConnectedCity/getAlerts`, body, { headers: header }).subscribe(Response => {
        Response.forEach((element: { lat: number; lon: number; }) => {
          const marker = L.marker([element.lat, element.lon])
            .bindPopup(`
          `);
          // markers.addLayer(marker);
          alert.addLayer(marker);
        });
      });
    }, 'Alert mode');

    // // init pin mode button
    // const pinbutton = L.easyButton('fa-map-pin', (btn, mMap) => {
    //   cluster.removeFrom(mMap);
    //   markers.addTo(mMap);
    // }, 'Pin mode');

    clusterbutton.addTo(map);
    alertbutton.addTo(map)

    // api call
    this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getSensors`, { headers: header }).subscribe(Response => {
      Response.forEach((element: { lat: number; lon: number; }) => {
        const marker = L.marker([element.lat, element.lon])
          .bindPopup(`
            <p>coucou</p>
          `);
        // markers.addLayer(marker);
        cluster.addLayer(marker);
      });
    });

    // add the clusters
    map.addLayer(cluster);
  }
}