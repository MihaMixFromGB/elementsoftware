import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserRowComponent } from './user-row/user-row.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    UserRowComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
