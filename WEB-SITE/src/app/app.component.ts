import { Component, OnInit } from '@angular/core';
import 'leaflet.markercluster';
import 'leaflet-easybutton';
import { HttpClient } from '@angular/common/http';
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
  }
}