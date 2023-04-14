import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  // url = 'http://localhost:3000/posts';
  url = 'https://booking-2cb6a-default-rtdb.firebaseio.com/';

  // private _places: Place[] = [
  //   {
  //     id: 'eiffel_tower',
  //     title: 'Eiffel Tower',
  //     description: 'A romantic place of Paris😍',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1558660149-07b0d25b2389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGVpZmZlbCUyMHRvd2VyJTIwYXQlMjBuaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  //     price: 75000,
  //     availableFrom: new Date(),
  //     availableTo: new Date('2024, 1, 1'),
  //     userId: '1',
  //   },
  //   {
  //     id: 'taj_mahal',
  //     title: 'Taj Mahal',
  //     description: 'Symbol of Love ❤',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  //     price: 1000,
  //     availableFrom: new Date(),
  //     availableTo: new Date('2024, 1, 1'),
  //     userId: '2',
  //   },
  //   {
  //     id: 'goa_beach',
  //     title: 'Goa Beach',
  //     description: 'just feel the sea 💧',
  //     imgUrl:
  //       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  //     price: 12000,
  //     availableFrom: new Date(),
  //     availableTo: new Date('2024, 1, 1'),
  //     userId: '3',
  //   },
  // ];

  // get Places() {
  //   return [...this._places];
  // }

  // getPlace(id: string) {
  //   return {
  //     ...this._places.find((p) => {
  //       return p.id === id;
  //     }),
  //   };
  // }

  getPlaceId(id: string) {
    console.log('http-id', id);
    return this.http.get(this.url + `offered-places/${id}.json`);
  }

  fetchPlaces() {
    return this.http.get(this.url + 'offered-places.json').pipe(
      map((res) => {
        const places = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            places.push({ ...res[key], id: key });
          }
        }
        return places;
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    imgUrl: string,
    price: number,
    offPercentage: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    {
      const newPlace: {
        id: string;
        title: string;
        description: string;
        imgUrl: string;
        price: number;
        offPercentage: number;
        availableFrom: Date;
        availableTo: Date;
        userId: string;
      } = {
        id: title.toLowerCase(),
        title: title,
        description: description,
        imgUrl: imgUrl,
        price: price,
        offPercentage: offPercentage,
        availableFrom: dateFrom,
        availableTo: dateTo,
        userId: title.toUpperCase(),
      };
      return this.http.post(this.url + 'offered-places.json', { ...newPlace });
    }
  }

  deletePlace(id: string) {
    return this.http.delete(this.url + `offered-places/${id}.json`);
  }

  updatePlace(id: string, data: any) {
    return this.http.put(this.url + `offered-places/${id}.json`, data);
  }
}
