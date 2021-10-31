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
  public _toUpdate: WineItem | undefined;
  @Output() submitted: EventEmitter<WineItem> = new EventEmitter();
  matcher!: MyErrorStateMatcher;

  wineControlForm = this.formBuiled.group({
    title: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
    price: ['', [Validators.required, Validators.min(0)]],
    img: [
      '',
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

  @Input() set toUpdate(value: WineItem) {
    this._toUpdate = value;
    this.changeInputValues(value);
  }

  changeInputValues(wine: WineItem) {
    if (wine) {
      const { title, price, img } = wine;
      this.wineControlForm.patchValue({
        title: title,
        price: price,
        img: img,
      });
    }
  }

  createOrUpdate() {
    const img =
      this.wineControlForm.value.img || 'http://lorempixel.com/200/200/food/';
    const newWine = {
      ...this.wineControlForm.value,
      img: img,
    };
    if (this._toUpdate) newWine._id = this._toUpdate._id;

    this.submitted.emit(newWine);
    this.reset();
  }
  // TODO : cannot edit same wine after it has been edited
  reset() {
    this.wineControlForm.reset();
    this._toUpdate = undefined;
  }
}
