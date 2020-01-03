import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Game } from '../../models/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService extends EntityService<Game, number> {

  constructor(http: HttpClient) {
    super(http);
  }

  protected url(): string {
    return 'game';
  }
  
  protected getID(entity: Game): number {
    return entity.id;
  }


}
