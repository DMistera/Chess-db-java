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


    public Integer getTournamentID() {
        return tournamentID;
    }

    public void setTournamentID(Integer tournamentID) {
        this.tournamentID = tournamentID;
    }

    public Object getWhitePlayerID() {
        return whitePlayerID;
    }

    public void setWhitePlayerID(int whitePlayerID) {
        this.whitePlayerID = whitePlayerID;
    }

    public Object getBlackPlayerID() {
        return blackPlayerID;
    }

    public void setBlackPlayerID(int blackPlayerID) {
        this.blackPlayerID = blackPlayerID;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(char result) {
        this.result = result;
    }

    public Object getDate() {
        return date;
    }


    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setDate(Date game_date) {
        this.date = game_date;
    }
}
