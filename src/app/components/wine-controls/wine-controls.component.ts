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
  private _toUpdate: WineItem | undefined;
  @Output() private submitted: EventEmitter<WineItem> = new EventEmitter();
  public matcher!: MyErrorStateMatcher;
  public wineControlForm = this.formBuiled.group({
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

  @Input() public set toUpdate(value: WineItem | undefined) {
    this._toUpdate = value;
    this.changeInputValues(value);
  }

  public get toUpdate(): WineItem | undefined {
    return this._toUpdate;
  }

  private changeInputValues(wine: WineItem | undefined) {
    if (wine) this.wineControlForm.patchValue({ ...wine });
  }

  public createOrUpdate() {
    const img =
      this.wineControlForm.value.img || 'http://lorempixel.com/200/200/food/';
    const newWine = {
      ...this.wineControlForm.value,
      img: img,
    };
    if (this.toUpdate) newWine._id = this.toUpdate._id;

    this.submitted.emit(newWine);
    this.reset();
  }

  public reset() {
    this.wineControlForm.reset();
    this.toUpdate = undefined;
  }
}
