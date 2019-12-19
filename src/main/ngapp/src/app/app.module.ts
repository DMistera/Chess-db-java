import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { PlayerListComponent } from './forms/player/player-list/component/player-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlayerEditorComponent } from './forms/player/player-editor/player-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerViewComponent } from './forms/player/player-view/player-view.component';
import { InterceptorService } from './shared/services/error-handler/interceptor.service';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { ClubListComponent } from './forms/club/club-list/club-list.component';
import { TournamentListComponent } from './forms/tournament/tournament-list/tournament-list.component';
import { ClubEditorComponent } from './forms/club/club-editor/club-editor.component';
import { ClubViewComponent } from './forms/club/club-view/club-view.component';
import { ClubPickerComponent } from './forms/club/club-picker/club-picker.component';
import { PickerComponent } from './shared/components/picker/picker.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    PlayerListComponent,
    PlayerEditorComponent,
    PlayerViewComponent,
    SearchBarComponent,
    TournamentListComponent,
    ClubListComponent,
    ClubEditorComponent,
    ClubViewComponent,
    ClubPickerComponent,
    PickerComponent
  ],
  entryComponents: [
    ClubPickerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
