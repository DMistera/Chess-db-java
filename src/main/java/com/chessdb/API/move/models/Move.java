package com.chessdb.API.move.models;

import lombok.Data;

@Data
public class Move {
    private int turn;
    private char color;
    private int gameID;
    private String moveValue;
}
