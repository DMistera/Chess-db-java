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
    const pgnLoadResult = this.chess.load_pgn(this.pgn);
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
