package com.chessdb.API.prize.models;

import lombok.Data;

@Data
public class Prize {
    String name;
    int quantity;
    int tournamentID;
    String sponsorName;
}
