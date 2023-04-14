import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';

  @ViewChild('f', { static: true }) form: NgForm;
  minDate: string;
  startDate: string;
  endDate: string;

  constructor(
    private moadalCtrl: ModalController,
    private bookingservice: BookingService,
    private alrtCtrl: AlertController
  ) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    console.log(this.selectedPlace.availableFrom);
    console.log(this.selectedPlace.availableTo);
    console.log(typeof this.minDate);

    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() * (6 * 24 * 60 * 60 * 1000)
      ).toISOString();
    }
  }

  onClickCancel() {
    this.moadalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace(f: NgForm) {
    if (!this.form.valid || !this.datesValid()) {
      return;
    }
    this.showAlert();
  }

  //service call
  addBooking() {
    this.bookingservice
      .addBooking(
        this.form.value['first-name'],
        this.form.value['last-name'],
        this.form.value['guest-number'],
        this.form.value['date-from'],
        this.form.value['date-to'],
        this.selectedPlace.title,
        this.selectedPlace.imgUrl
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }

  private showAlert() {
    this.alrtCtrl
      .create({
        header: 'Booking Confirmation',
        message: 'Your place has been booked!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
          {
            text: 'Confirm',
            handler: () => {
              console.log('Confirm clicked');
              // Here you can add your code to handle the booking confirmation
              this.addBooking();
              this.showBoked();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  private showBoked() {
    this.alrtCtrl
      .create({
        header: 'Congratulations!',
        subHeader: 'Booked!😃',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.moadalCtrl.dismiss();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
