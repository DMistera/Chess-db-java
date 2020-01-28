package com.chessdb.API.game.models;

import lombok.Data;

import java.sql.Date;

@Data
public class Game {
    private int id;
    private char result;
    private Date date;
    private int whitePlayerID;
    private int blackPlayerID;
    private int tournamentID;
}
