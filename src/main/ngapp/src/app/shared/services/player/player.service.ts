import { Injectable } from '@angular/core';
import { Player } from '../../models/player';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players$ = new BehaviorSubject<Player[]>([]);

  constructor(private http: HttpClient) {
    this.refreshPlayers$();
  }

  public getPlayers$(): Observable<Player[]> {
    return this.players$.asObservable();
  }

  public getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>('player/' + id);
  }

  public updatePlayer(player: Player) {
    this.http.put('player', player).subscribe(() => {
      this.refreshPlayers$();
    });
  }

  public createPlayer(player: Player) {
    console.log(player);
    this.http.post('player', player).subscribe(() => {
      this.refreshPlayers$();
    });
  }

  private refreshPlayers$() {
    this.http.get<Player[]>('player/all').subscribe(players => {
      this.players$.next(players);
    }, err => {
      console.log(err);
    });
  }

}
