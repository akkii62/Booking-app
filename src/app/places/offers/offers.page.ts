import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadedplaces: any;
  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    // this.loadedplaces = this.placesService.Places;
    // this.getplaces();
  }

  getplaces() {
    this.placesService.fetchPlaces().subscribe((res) => {
      this.loadedplaces = res;
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.getplaces();
    }, 300);
  }

  onClickEdit(offerId: string) {
    console.log('Editing Item', offerId);
  }

  onClickDelete(placeId: string) {
    this.placesService.deletePlace(placeId).subscribe((res) => {
      this.getplaces();
    });
  }
}
