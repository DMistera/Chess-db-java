import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Organizer } from '../../models/organizer';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService extends EntityService<Organizer, string> {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  public getTournamentCount(id: string) {
    return this.http.get<number>(this.url() + '/count-tournament/' + id);
  }


  protected url(): string {
    return 'organizer';
  }
  protected getID(entity: Organizer): string {
    return entity.name;
  }
}
