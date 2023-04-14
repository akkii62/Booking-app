import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  loadedBookings: any;
  currentId: any;
  constructor(
    private bookingservice: BookingService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  getBookings() {
    this.bookingservice.fetchBooking().subscribe((res) => {
      this.loadedBookings = res;
      console.log(this.loadedBookings);
    });
  }

  ionViewWillEnter() {
    this.getBookings();
  }

  onCancelBooking(id: string) {
    this.currentId = id;
    this.showAlert();
  }

  deleteBooking() {
    this.bookingservice.deleteData(this.currentId).subscribe((res) => {
      this.getBookings();
    });
  }

  private showAlert() {
    this.alertCtrl
      .create({
        header: 'Are you sure!',
        buttons: [
          {
            text: 'cancel',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'confirm',
            handler: () => {
              this.deleteBooking();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
