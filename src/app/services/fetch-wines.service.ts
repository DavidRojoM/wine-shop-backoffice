import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WineItem } from '../interfaces/wine-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchWinesService {
  // private wines!: WineItem[];
  // //   = [
  // //   {
  // //     img: 'https://picsum.photos/200/200',
  // //     title: 'prueba',
  // //     price: 1,
  // //   },
  // //   {
  // //     img: 'https://picsum.photos/200/200',
  // //     title: 'prueba2',
  // //     price: 2,
  // //   },
  // //   {
  // //     img: 'https://picsum.photos/200/200',
  // //     title: 'prueba3',
  // //     price: 3,
  // //   },
  // //   {
  // //     img: 'https://picsum.photos/200/200',
  // //     title: 'prueba4',
  // //     price: 4,
  // //   },
  // // ];
  private API_URL = `http://localhost:3000/api/wines`;
  constructor(private http: HttpClient) {}

  // private fetchWines(): void {
  //   this.http.get<WineItem[]>(this.API_URL).subscribe(
  //     (res) => (this.wines = res),
  //     (err) => console.error(err)
  //   );
  // }

  public getWines(): Observable<WineItem[]> {
    return this.http.get<WineItem[]>(this.API_URL);
  }
}
