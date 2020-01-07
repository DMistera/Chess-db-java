import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Tournament } from '../../models/tournament';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TournamentService extends EntityService<Tournament, number> {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
   }

  protected url(): string {
    return 'tournament';
  }
  protected getID(entity: Tournament): number {
    return entity.id;
  }
}
