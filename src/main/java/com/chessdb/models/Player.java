package com.chessdb.models;

import lombok.Data;

@Data
public class Player {
    private int id;
    private String name;
    private String surname;
    private int elo;
    private String category;
}
