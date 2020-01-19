import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Tournament } from '../../models/tournament';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../player/player.service';
import { Prize } from '../../models/prize';
import { SponsorService } from '../sponsor/sponsor.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService extends EntityService<Tournament, number> {

  constructor(http: HttpClient, router: Router, private playerService: PlayerService, private sponsorService: SponsorService) {
    super(http, router);
   }

  protected url(): string {
    return 'tournament';
  }
  protected getID(entity: Tournament): number {
    return entity.id;
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

  public addPlayer(id: number, playerID: number) {
    return this.http.put(this.url() + '/add-player/' + id, playerID).subscribe(() => {
      this.refreshID(id);
      this.playerService.refreshID(playerID);
    });
  }

  public removePlayer(id: number, playerID: number) {
    return this.http.put(this.url() + '/remove-player/' + id, playerID).subscribe(() => {
      this.refreshID(id);
      this.playerService.refreshID(playerID);
    });
  }

  public getPrizes(id: number) {
    return this.http.get<Prize[]>(this.url() + '/prize/' + id);
  }

  public addPrize(prize: Prize) {
    return this.http.put(this.url() + '/add-prize/' + prize.tournamentID, prize).subscribe(() => {
      this.refreshID(prize.tournamentID);
      this.sponsorService.refreshID(prize.sponsorName);
    });
  }

  public removePrize(prize: Prize) {
    return this.http.put(this.url() + '/remove-prize/' + prize.tournamentID, prize).subscribe(() => {
      this.refreshID(prize.tournamentID);
      this.sponsorService.refreshID(prize.sponsorName);
    });
  }
}
