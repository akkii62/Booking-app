import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.page.html',
  styleUrls: ['./edit-offers.page.scss'],
})
export class EditOffersPage implements OnInit {
  place: any;
  form: FormGroup;
  storedDate: string;

  constructor(
    private route: ActivatedRoute,
    private navctrl: NavController,
    private placeService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navctrl.navigateBack('/places/offers');
        return;
      }

      this.placeService
        .getPlaceId(paramMap.get('placeId'))
        .subscribe((res: any) => {
          console.log('paramap id=========>>>', paramMap.get('placeId'));
          console.log('edit res=========>>>', res);
          this.place = res;

          this.form.patchValue({
            title: res?.title,
            description: res?.description,
            imgUrl: res?.imgUrl,
            price: res?.price,
            offPercentage: res?.offPercentage,
            availableFrom: res?.availableFrom,
            availableTo: res?.availableTo,
          });
        });

      this.form = new FormGroup({
        title: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        description: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)],
        }),
        imgUrl: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        price: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        offPercentage: new FormControl(null, {
          updateOn: 'blur',
        }),
        availableFrom: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        availableTo: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      });
    });
  }

  onUpdateOffers() {
    if (!this.form.valid) {
      return;
    }

    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navctrl.navigateBack('/places/offers');
        return;
      }

      this.placeService
        .updatePlace(paramMap.get('placeId'), this.form.value)
        .subscribe();
    });
  }

  getTodayDate() {
    const today = new Date().toISOString().slice(0, 10);
    return today;
  }

  getDateAfter10Years() {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 10);
    return today.toISOString().slice(0, 10);
  }
}
