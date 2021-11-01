import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WineItem } from '../../interfaces/wine-item';

@Component({
  selector: 'app-wine-item',
  templateUrl: './wine-item.component.html',
  styleUrls: ['./wine-item.component.scss'],
})
export class WineItemComponent implements OnInit {
  @Input() item!: WineItem;
  @Output() private update: EventEmitter<WineItem> = new EventEmitter();
  @Output() private delete: EventEmitter<WineItem> = new EventEmitter();

  wineData!: WineItem;
  constructor() {}

  ngOnInit(): void {
    this.wineData = { ...this.item };
  }

  public updateItem() {
    this.update.emit(this.wineData);
  }

  public deleteItem() {
    this.delete.emit(this.wineData);
  }
}
