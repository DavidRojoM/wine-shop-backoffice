import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WineItemComponent } from './components/wine-item/wine-item.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { WineControlsComponent } from './components/wine-controls/wine-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    WineItemComponent,
    WineListComponent,
    WineControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
