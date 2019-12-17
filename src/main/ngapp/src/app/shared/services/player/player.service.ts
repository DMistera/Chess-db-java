import { Injectable } from '@angular/core';
import { Player } from '../../models/player';
import { EntityService } from '../entity-service/entity.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends EntityService<Player, number> {
  protected getID(entity: Player): number {
    return entity.id;
  }

  constructor(http: HttpClient) {
    super(http);
  }

  protected url(): string {
    return 'player';
  }
}
