import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  loadedplaces: any;
  listedLoadedPlaces: Place[];

  constructor(private placesService: PlacesService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.placesService.fetchPlaces().subscribe((res) => {
      this.loadedplaces = res;
      this.listedLoadedPlaces = this.loadedplaces.slice(1);
      console.log('loadedplace===========>>>>', this.loadedplaces);
    });
  }

  onFilterUpdate(event) {
    console.log(event.detail);
  }
}
