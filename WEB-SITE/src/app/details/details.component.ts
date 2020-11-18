import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }
  public sensorid: String = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sensorid = params['sensorid'];
      console.log(this.sensorid);
      // http://localhost:4200/details/dbb500af-8c53-488a-a64a-04b4618b503b
    });
  }

}
