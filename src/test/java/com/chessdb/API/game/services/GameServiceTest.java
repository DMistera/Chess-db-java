package com.chessdb.API.game.services;

import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Piece;
import com.github.bhlangonijr.chesslib.Square;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GameServiceTest {

    GameService gameService = new GameService();

    @Test
    void getPGN() {
    }

    @Test
    void setPGN() throws Exception {
       Board board = new Board();
       System.out.println(board.getSideToMove());
    }
}