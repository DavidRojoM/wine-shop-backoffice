import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WineItem } from '../../interfaces/wine-item';

@Component({
  selector: 'app-wine-item',
  templateUrl: './wine-item.component.html',
  styleUrls: ['./wine-item.component.scss'],
})
export class WineItemComponent implements OnInit {
  @Input() item!: WineItem;
  @Output() update: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();
  _id!: string;
  img!: string;
  title!: string;
  price!: number;
  constructor() {}

  ngOnInit(): void {
    const { _id, img, title, price } = this.item;
    this._id = _id;
    this.img = img;
    this.title = title;
    this.price = price;
  }

  updateItem() {
    this.update.emit(this.title);
  }

  deleteItem() {
    this.delete.emit(this.item._id);
  }
}
