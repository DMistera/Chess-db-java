package com.chessdb.API.tournament.models;

import lombok.Data;

import java.sql.Date;

@Data
public class Tournament {
    int id;
    String name;
    Date startDate;
    Date endDate;
    float entryFee;
    String location;
}
