import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-easybutton';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  ngOnInit() {

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

    // all markers init
    const markers = L.featureGroup();

    // init cluster button
    const clusterbutton = L.easyButton('fa-dot-circle', (btn, mMap) => {
      markers.removeFrom(mMap);
      cluster.addTo(mMap);
    }, 'Cluster mode');

    // // init pin mode button
    // const pinbutton = L.easyButton('fa-map-pin', (btn, mMap) => {
    //   cluster.removeFrom(mMap);
    //   markers.addTo(mMap);
    // }, 'Pin mode');

    clusterbutton.addTo(map);
    // pinbutton.addTo(map)
    
    // api call
    this.http.get<any>(`https://eclisson.duckdns.org/ConnectedCity/getSensors`).subscribe(Response => {
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