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

      console.log(this.wineControlForm.value);
    }
  }

  createOrUpdate() {
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
    this.wineControlForm.reset();
    // this.wineControlForm.markAsUntouched();
  }
  // TODO : cannot edit same wine after it has been edited
  reset() {
    this._toUpdate = undefined;
  }
}
