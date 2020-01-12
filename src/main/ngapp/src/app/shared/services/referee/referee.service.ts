import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Referee } from '../../models/referee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefereeService extends EntityService<Referee, number> {
  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }
  protected url(): string {
    return 'referee';
  }
  protected getID(entity: Referee): number {
    return entity.id;
  }
}
