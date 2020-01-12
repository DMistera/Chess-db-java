import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
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
import { EntityTableComponent } from './shared/components/entity-table/entity-table.component';
import { PlayerTableComponent } from './forms/player/player-table/player-table.component';
import { GameEditorComponent } from './forms/game/game-editor/game-editor.component';
import { PlayerListComponent } from './forms/player/player-list/player-list.component';
import { EntityListComponent } from './shared/components/entity-list/entity-list.component';
import { GameListComponent } from './forms/game/game-list/game-list.component';
import { EntityEditorComponent } from './shared/components/entity-editor/entity-editor.component';
import { PlayerPickerComponent } from './forms/player/player-picker/player-picker.component';
import { GameViewComponent } from './forms/game/game-view/game-view.component';
import { GamePreviewComponent } from './shared/components/game-preview/game-preview.component';

import * as $ from 'jquery';
import { TournamentViewComponent } from './forms/tournament/tournament-view/tournament-view.component';
import { TournamentEditorComponent } from './forms/tournament/tournament-editor/tournament-editor.component';
import { OrganizerListComponent } from './forms/organizer/organizer-list/organizer-list.component';
import { OrganizerViewComponent } from './forms/organizer/organizer-view/organizer-view.component';
import { OrganizerEditorComponent } from './forms/organizer/organizer-editor/organizer-editor.component';
import { OrganizerPickerComponent } from './forms/organizer/organizer-picker/organizer-picker.component';
import { TournamentTableComponent } from './forms/tournament/tournament-table/tournament-table.component';

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
    PickerComponent,
    EntityTableComponent,
    PlayerTableComponent,
    GameEditorComponent,
    EntityListComponent,
    GameListComponent,
    EntityEditorComponent,
    PlayerPickerComponent,
    GameViewComponent,
    GamePreviewComponent,
    TournamentViewComponent,
    TournamentEditorComponent,
    OrganizerListComponent,
    OrganizerViewComponent,
    OrganizerEditorComponent,
    OrganizerPickerComponent,
    TournamentTableComponent
  ],
  entryComponents: [
    PlayerEditorComponent,
    GameEditorComponent,
    ClubEditorComponent,
    TournamentEditorComponent,
    OrganizerEditorComponent,
    ClubPickerComponent,
    PlayerPickerComponent,
    OrganizerPickerComponent
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
