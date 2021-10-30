import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './utils/ErrorStateMatcher';
import { WineItem } from '../../interfaces/wine-item';

@Component({
  selector: 'app-wine-controls',
  templateUrl: './wine-controls.component.html',
  styleUrls: ['./wine-controls.component.scss'],
})
export class WineControlsComponent implements OnInit {
  private _toUpdate!: WineItem;
  @Output() submitted: EventEmitter<WineItem> = new EventEmitter();
  matcher!: MyErrorStateMatcher;

  titleValue = '';
  priceValue: string = '0';
  imgValue = '';

  wineControlForm = this.formBuiled.group({
    title: [this.titleValue, [Validators.required, Validators.minLength(2)]],
    price: [this.priceValue, [Validators.required, Validators.min(0)]],
    img: [
      this.imgValue,
      [
        Validators.pattern(
          '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$'
        ),
      ],
    ],
  });
  constructor(private formBuiled: FormBuilder) {}

  ngOnInit(): void {
    this.matcher = new MyErrorStateMatcher();
  }

  get toUpdate(): WineItem {
    return this._toUpdate;
  }

  @Input() set toUpdate(value: WineItem) {
    this._toUpdate = value;
    this.changeInputValues(value);
  }

  changeInputValues(wine: WineItem) {
    if (wine) {
      const { title, price, img } = wine;
      this.titleValue = title;
      this.priceValue = String(price);
      this.imgValue = img;

      this.wineControlForm.updateValueAndValidity();
    }
  }

  send() {
    if (this._toUpdate) {
      const { _id } = this._toUpdate;
      const obj = {
        _id,
        ...this.wineControlForm.value,
      };
      console.log('Obj con id para editar', obj);
      this.submitted.emit(obj);
    } else {
      console.log('Obj sin id para crear', this.wineControlForm.value);
      this.submitted.emit(this.wineControlForm.value);
    }
  }
}
