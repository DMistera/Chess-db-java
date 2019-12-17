import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { HttpClient } from '@angular/common/http';
import { Club } from '../../models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService extends EntityService<Club, number> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected url(): string {
    return 'club';
  }
  protected getID(entity: Club): number {
    return entity.id;
  }
}
