import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { HttpClient } from '@angular/common/http';
import { Club } from '../../models/club';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService extends EntityService<Club, number> {
  constructor(http: HttpClient) {
    super(http);
  }

  public getPlayerCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/' + id + '/count-players');
  }

  protected url(): string {
    return 'club';
  }
  protected getID(entity: Club): number {
    return entity.id;
  }
}
