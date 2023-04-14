import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersBookingPageRoutingModule } from './offers-booking-routing.module';

import { OffersBookingPage } from './offers-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersBookingPageRoutingModule
  ],
  declarations: [OffersBookingPage]
})
export class OffersBookingPageModule {}
