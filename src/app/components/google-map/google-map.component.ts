import { Marker } from '@agm/core';
import { Component, Input, OnInit } from '@angular/core';
import { Markers } from 'src/app/models/agm.models';

interface latlong {
  lat: any;
  lng: any;
}

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {

  lat = 42.3154;
  lng = 43.3569;
  zoom = 7;
  markers: Markers[] = [];

  @Input()
  set mapMarkers(value: number) {
    this.markers = [];
    for (let i = 0; i < value; ++i) {
      this.markers.push({
        lat: Math.random() + 41.7,
        lng: Math.random() + 42.6,
        alpha: 1,
      });
    }
  }

  constructor() {}

  ngOnInit(): void {}

}
