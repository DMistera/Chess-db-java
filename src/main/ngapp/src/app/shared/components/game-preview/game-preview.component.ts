import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit, AfterViewChecked, Input } from '@angular/core';
import { ChessInstance } from 'chess.js';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';

const Chess = require('chess.js');

const Chessboard = require('chessboardjs');

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss']
})
export class GamePreviewComponent implements OnInit, AfterViewChecked {

  @Input()
  pgn: string;

  chess: ChessInstance;
  chessBoard: any;
  initialized = false;
  history: string[];
  moveIndex = 0;

  constructor(
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.chess = new Chess();
    this.chess.reset();
    const c = ['[Event "Casual Game"]',
       '[Site "Berlin GER"]',
       '[Date "1852.??.??"]',
       '[EventDate "?"]',
       '[Round "?"]',
       '[Result "1-0"]',
       '[White "Adolf Anderssen"]',
       '[Black "Jean Dufresne"]',
       '[ECO "C52"]',
       '[WhiteElo "?"]',
       '[BlackElo "?"]',
       '[PlyCount "47"]',
       '',
       '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
       'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
       'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
       'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
       '23.Bd7+ Kf8 24.Bxe7# 1-0'];
    const pgnLoadResult = this.chess.load_pgn(c.join('\n'));
    if (pgnLoadResult) {
      this.history = this.chess.history();
      this.chess.reset();
    } else {
      this.errorHandler.showError('Failed to parse PGN!');
    }
  }

  ngAfterViewChecked(): void {
    if (document.getElementById('chessboard') != null && !this.initialized) {
      this.chessBoard = Chessboard('chessboard', this.chess.fen());
      this.initialized = true;
    }
  }

  updateChessboard() {
    this.chessBoard.position(this.chess.fen());
  }

  previousMove() {
    this.chess.undo();
    this.moveIndex--;
    this.updateChessboard();
  }

  nextMove() {
    this.chess.move(this.history[this.moveIndex]);
    this.moveIndex++;
    this.updateChessboard();
  }

}
