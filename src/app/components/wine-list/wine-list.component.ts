import { Component, OnInit } from '@angular/core';
import { WineItem } from '../../interfaces/wine-item';
import { FetchWinesService } from '../../services/fetch-wines.service';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss'],
})
export class WineListComponent implements OnInit {
  items!: WineItem[];
  itemToUpdate!: WineItem;
  constructor(public wineService: FetchWinesService) {}

  ngOnInit(): void {
    this.fetchWines();
  }

  private fetchWines() {
    this.wineService.getWines().subscribe(
      (res) => (this.wineService.wines = res),
      (err) => console.error(err)
    );
  }

  deleteItem($event: WineItem) {
    this.wineService.deleteWine($event);
  }

  setItemToBeUpdated(wine: WineItem) {
    this.itemToUpdate = wine;
  }

  createOrUpdate(wine: WineItem) {
    wine._id
      ? this.wineService.editWine(wine)
      : this.wineService.createWine(wine);
  }
}
