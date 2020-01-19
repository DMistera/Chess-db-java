import { BehaviorSubject, Observable, Subject, concat, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

export abstract class EntityService<T, IdType> {

  entities$ = new BehaviorSubject<T[]>(null);

  singleEntities = new Map<IdType, BehaviorSubject<T>>();

  constructor(
    protected http: HttpClient,
    protected router: Router
    ) {
    this.refresh();
  }

  public navigate(id: IdType) {
    this.router.navigate([this.url() +  '/' + id]);
  }

  public getAll(): Observable<T[]> {
    return this.entities$.asObservable().pipe(filter(entity => entity !== null));
  }

  public getByID(id: IdType): Observable<T> {
    if (!this.singleEntities.has(id)) {
      this.singleEntities.set(id, new BehaviorSubject<T>(null));
      this.refreshID(id);
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

  public delete(id: IdType) {
    this.http.delete(this.url() + '/' + id).subscribe(() => {
      this.refresh();
    });
  }

  protected abstract url(): string;
  protected abstract getID(entity: T): IdType;

  public refresh(id?: IdType) {
    this.http.get<T[]>(this.url()).subscribe(entities => {
      this.entities$.next(entities);
    });
    if (id) {
      this.refreshID(id);
    }
  }

  public refreshID(id: IdType) {
    if (this.singleEntities.has(id)) {
      this.http.get<T>(this.url() + '/' + id).subscribe(entity => {
        this.singleEntities.get(id).next(entity);
      });
    }
  }

}
