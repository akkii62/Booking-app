import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offers-booking',
  templateUrl: './offers-booking.page.html',
  styleUrls: ['./offers-booking.page.scss'],
})
export class OffersBookingPage implements OnInit {
  place: any;
  currentId: string;
  constructor(
    private route: ActivatedRoute,
    private placesServices: PlacesService,
    private navctrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navctrl.navigateBack('/places/offers');
        return;
      }

      this.placesServices
        .getPlaceId(paramMap.get('placeId'))
        .subscribe((res) => {
          this.currentId = paramMap.get('placeId');
          this.place = res;
        });
      // this.place = this.placesServices.Places.find((p) => {
      //   return p.id === paramMap.get('placeId');
      // });
    });
  }
}
