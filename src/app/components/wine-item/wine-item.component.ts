import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WineItem } from '../../interfaces/wine-item';

@Component({
  selector: 'app-wine-item',
  templateUrl: './wine-item.component.html',
  styleUrls: ['./wine-item.component.scss'],
})
export class WineItemComponent implements OnInit {
  @Input() item!: WineItem;
  @Output() pruebaOutput: EventEmitter<string> = new EventEmitter();
  img!: string;
  title!: string;
  price!: number;
  constructor() {}

  ngOnInit(): void {
    const { img, title, price } = this.item;
    this.img = img;
    this.title = title;
    this.price = price;
  }

  sendEvent() {
    this.pruebaOutput.emit(this.title);
  }
}
