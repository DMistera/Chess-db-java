import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Tournament } from '../../models/tournament';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../player/player.service';
import { Prize } from '../../models/prize';
import { SponsorService } from '../sponsor/sponsor.service';
import { RefereeService } from '../referee/referee.service';
import { MediaPatronService } from '../media-patron/media-patron.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService extends EntityService<Tournament, number> {

  constructor(
    http: HttpClient,
    router: Router,
    private playerService: PlayerService,
    private sponsorService: SponsorService,
    private refereeService: RefereeService,
    private mediaPatronService: MediaPatronService
     ) {
    super(http, router);
   }

  protected url(): string {
    return 'tournament';
  }
  protected getID(entity: Tournament): number {
    return entity.id;
  }

  public getPlayerCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/count-player/' + id);
  }

  public getRefereeCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/count-referee/' + id);
  }

  public getSponsorCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/count-sponsor/' + id);
  }

  public getPatronCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/count-patron/' + id);
  }

  public getGameCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/count-game/' + id);
  }

  public getPlayerTournaments(playerID: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.url() + '/player/' + playerID);
  }

  public getOrganizerTournaments(organizerName: string): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.url() + '/organizer/' + organizerName);
  }

  public getRefereeTournaments(refereeID: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.url() + '/referee/' + refereeID);
  }

  public getMediaPatronTournaments(mediaPatronName: string): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.url() + '/media-patron/' + mediaPatronName);
  }

  public addPlayer(id: number, playerID: number) {
    this.http.put(this.url() + '/add-player/' + id, playerID).subscribe(() => {
      this.refreshID(id);
      this.playerService.refreshID(playerID);
    });
  }

  public removePlayer(id: number, playerID: number) {
    this.http.put(this.url() + '/remove-player/' + id, playerID).subscribe(() => {
      this.refreshID(id);
      this.playerService.refreshID(playerID);
    });
  }

  public getPrizes(id: number) {
    return this.http.get<Prize[]>(this.url() + '/prize/' + id);
  }

  public addPrize(prize: Prize) {
    this.http.put(this.url() + '/add-prize/' + prize.tournamentID, prize).subscribe(() => {
      this.refreshID(prize.tournamentID);
      this.sponsorService.refreshID(prize.sponsorName);
    });
  }

  public removePrize(prize: Prize) {
    this.http.put(this.url() + '/remove-prize/' + prize.tournamentID, prize).subscribe(() => {
      this.refreshID(prize.tournamentID);
      this.sponsorService.refreshID(prize.sponsorName);
    });
  }

  public addReferee(id: number, refereeId: number) {
    this.http.put(this.url() + '/add-referee/' + id, refereeId).subscribe(() => {
      this.refreshID(id);
      this.refereeService.refreshID(refereeId);
    });
  }

  public removeReferee(id: number, refereeId: number) {
    this.http.put(this.url() + '/remove-referee/' + id, refereeId).subscribe(() => {
      this.refreshID(id);
      this.refereeService.refreshID(refereeId);
    });
  }

  public addMediaPatron(id: number, mediaPatronName: string) {
    this.http.put(this.url() + '/add-patron/' + id, mediaPatronName).subscribe(() => {
      this.refreshID(id);
      this.mediaPatronService.refreshID(mediaPatronName);
    });
  }

  public removeMediaPatron(id: number, mediaPatronName: string) {
    this.http.put(this.url() + '/remove-patron/' + id, mediaPatronName).subscribe(() => {
      this.refreshID(id);
      this.mediaPatronService.refreshID(mediaPatronName);
    });
  }
}
