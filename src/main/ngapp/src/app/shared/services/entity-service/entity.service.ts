import { BehaviorSubject, Observable, Subject, concat, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, filter } from 'rxjs/operators';

export abstract class EntityService<T, IdType> {

  entities$ = new BehaviorSubject<T[]>(null);

  singleEntities = new Map<IdType, BehaviorSubject<T>>();

  constructor(protected http: HttpClient) {
    this.refresh();
  }

  public getAll(): Observable<T[]> {
    return this.entities$.asObservable().pipe(filter(entity => entity !== null));
  }

  public getByID(id: IdType): Observable<T> {
    if (!this.singleEntities.has(id)) {
      this.singleEntities.set(id, new BehaviorSubject<T>(null));
      this.refreshID(id).subscribe();
    }
    return this.singleEntities.get(id).asObservable().pipe(filter(entity => entity !== null));
  }

  public update(entity: T) {
    this.http.put(this.url(), entity).subscribe(() => {
      this.refresh(this.getID(entity));
    });
  }

  public create(entity: T) {
    this.http.post(this.url(), entity).subscribe(() => {
      this.refresh();
    });
  }

  protected abstract url(): string;
  protected abstract getID(entity: T): IdType;

  private refresh(id?: IdType) {
    this.http.get<T[]>(this.url()).subscribe(entities => {
      this.entities$.next(entities);
    });
    if (id) {
      this.refreshID(id).subscribe();
    }
  }

  private refreshID(id: IdType): Observable<T> {
    return this.http.get<T>(this.url() + '/' + id).pipe(tap(entity => {
      this.singleEntities.get(id).next(entity);
    }));
  }

}
