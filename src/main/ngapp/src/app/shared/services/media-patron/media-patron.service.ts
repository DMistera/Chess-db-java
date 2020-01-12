import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { MediaPatron } from '../../models/media-patron';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaPatronService extends EntityService<MediaPatron, string> {
  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }
  protected url(): string {
    return 'media-patron';
  }
  protected getID(entity: MediaPatron): string {
    return entity.name;
  }
}
