import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit, AfterViewChecked, Input } from '@angular/core';
import { ChessInstance } from 'chess.js';

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

  constructor() { }

  ngOnInit() {
    this.chess = new Chess();
    this.chess.reset();
  }

  ngAfterViewChecked(): void {
    if (document.getElementById('chessboard') != null && !this.initialized) {
      this.chessBoard = Chessboard('chessboard', 'start');
      this.initialized = true;
    }
  }

}
