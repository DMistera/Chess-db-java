import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Sponsor } from '../../models/sponsor';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Prize } from '../../models/prize';

@Injectable({
  providedIn: 'root'
})
export class SponsorService extends EntityService<Sponsor, string> {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  public getTournamentCount(id: string) {
    return this.http.get<number>(this.url() + '/count-tournament/' + id);
  }

  public getPrizes(sponsorName: string): Observable<Prize[]> {
    return this.http.get<Prize[]>(this.url() + '/prize/' + sponsorName);
  }

  protected url(): string {
    return 'sponsor';
  }
  protected getID(entity: Sponsor): string {
    return entity.name;
  }
}
