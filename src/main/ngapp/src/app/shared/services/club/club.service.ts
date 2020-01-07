import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { HttpClient } from '@angular/common/http';
import { Club } from '../../models/club';
import { Observable } from 'rxjs';
import { PlayerService } from '../player/player.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClubService extends EntityService<Club, number> {

  constructor(http: HttpClient, router: Router,
              private playerService: PlayerService) {
    super(http, router);
  }

  public getPlayerCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/' + id + '/count-players');
  }

  public addPlayer(id: number, playerID: number) {
    return this.http.put(this.url() + '/add-player/' + id, playerID).subscribe(() => {
      this.playerService.refreshID(playerID).subscribe();
    });
  }

  protected url(): string {
    return 'club';
  }
  protected getID(entity: Club): number {
    return entity.id;
  }
}
