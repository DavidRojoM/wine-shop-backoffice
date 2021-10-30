import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WineItem } from '../../interfaces/wine-item';

@Component({
  selector: 'app-wine-item',
  templateUrl: './wine-item.component.html',
  styleUrls: ['./wine-item.component.scss'],
})
export class WineItemComponent implements OnInit {
  @Input() item!: WineItem;
  @Output() update: EventEmitter<WineItem> = new EventEmitter();
  @Output() delete: EventEmitter<WineItem> = new EventEmitter();

  wineData: WineItem = {
    _id: '',
    img: '',
    title: '',
    price: 0,
  };
  constructor() {}

  ngOnInit(): void {
    this.wineData = { ...this.item };
  }

  updateItem() {
    this.update.emit(this.wineData);
  }

  deleteItem() {
    this.delete.emit(this.wineData);
  }
}
