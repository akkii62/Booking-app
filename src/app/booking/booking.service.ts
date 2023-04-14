import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}
  // Url = ' http://localhost:3000/Bookings';
  Url = 'https://booking-2cb6a-default-rtdb.firebaseio.com/Bookings';

  addBooking(
    firstName: string,
    LastName: string,
    guestNumber: number,
    startDate: Date,
    endDate: Date,
    placeTitle: string,
    imgUrl: string
  ) {
    const BookingData: {
      id: string;
      firstName: string;
      lastName: string;
      placeTitle: string;
      guestNumber: number;
      startDate: Date;
      endDate: Date;
      imgUrl: string;
    } = {
      id: Math.random().toString(),
      firstName: firstName,
      lastName: LastName,
      placeTitle: placeTitle,
      guestNumber: guestNumber,
      startDate: startDate,
      endDate: endDate,
      imgUrl: imgUrl,
    };
    return this.http.post(this.Url + '.json', { ...BookingData });
    console.log(BookingData);
  }

  fetchBooking() {
    return this.http.get(this.Url + '.json').pipe(
      map((res) => {
        const bookings = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            bookings.push({ ...res[key], id: key });
          }
        }
        return bookings;
      })
    );
  }

  deleteData(id: string) {
    return this.http.delete(this.Url + `/${id}.json`);
  }
}
