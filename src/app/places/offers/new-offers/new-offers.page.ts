import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {
  form: FormGroup;
  storedDate: string;
  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.maxLength(180), Validators.required],
      }),
      imgUrl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      offPercentage: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.min(0), Validators.max(100)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  onCreateOffer() {
    if (!this.form) {
      return;
    }
    this.placesService
      .addPlace(
        this.form.value.title,
        this.form.value.description,
        this.form.value.imgUrl,
        +this.form.value.price,
        +this.form.value.offPercentage,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo)
      )
      .subscribe();
    this.form.reset();
    this.router.navigateByUrl('/places/offers');
  }

  getTodayDate() {
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = today.getMonth() + 1;
    // const day = today.getDate();

    // // Pad month and day values with a leading zero if needed
    // const paddedMonth = month < 10 ? `0${month}` : month;
    // const paddedDay = day < 10 ? `0${day}` : day;

    // return `${year}-${paddedMonth}-${paddedDay}`;
    const today = new Date().toISOString().slice(0, 10);
    return today;
  }

  getDateAfter10Years() {
    // const today = new Date();
    // const year = today.getFullYear() + 10;
    // const month = today.getMonth() + 1;
    // const day = today.getDate();
    // // Pad month and day values with a leading zero if needed
    // const paddedMonth = month < 10 ? `0${month}` : month;
    // const paddedDay = day < 10 ? `0${day}` : day;
    // return `${year}-${paddedMonth}-${paddedDay}`;

    const today = new Date();
    today.setFullYear(today.getFullYear() + 10);
    return today.toISOString().slice(0, 10);
  }
}
