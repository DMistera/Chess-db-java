import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Sponsor } from '../../models/sponsor';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SponsorService extends EntityService<Sponsor, string> {
  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }
  protected url(): string {
    return 'sponsor';
  }
  protected getID(entity: Sponsor): string {
    return entity.name;
  }
}
