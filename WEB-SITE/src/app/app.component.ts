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


    // api call
    // this.http.get<any>(`${environment.NewApiAddress}/map`).subscribe(Response => {
    //   Response.forEach(element => {
    //     const marker = L.marker([element.latitude, element.longitude])
    //       .bindPopup(`
    //         <p>coucou</p>
    //       `);
    //     // markers.addLayer(marker);
    //     cluster.addLayer(marker);
    //   });
    // });
    for (let i = 0; i < 10000; i++) {
      const marker = L.marker([Math.random() * 360, Math.random() * 360])
          .bindPopup(`
            <p>coucou</p> 
          `);
        // markers.addLayer(marker);
        cluster.addLayer(marker);
    }

    // add the clusters
    map.addLayer(cluster);

  }
}