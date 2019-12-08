package com.chessdb.API.player.services;

import com.chessdb.API.player.models.Player;
import com.chessdb.services.database.DatabaseConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private DatabaseConnection connection;

    public Player[] getAllPlayers() throws SQLException {
        List<Player> playerList = new ArrayList<>();
        ResultSet queryResult = connection.query("SELECT * FROM PLAYERS");
        while(queryResult.next()) {
            playerList.add(readPlayerFromRow(queryResult));
        }
        Player[] result = new Player[playerList.size()];
        return playerList.toArray(result);
    }

    public void insertPlayer(Player player) throws SQLException {
        connection.callProcedure("insertPlayer", player.getName(), player.getSurname(), player.getElo(),  player.getCategory());
    }

    public void updatePlayer(Player player)  throws SQLException {
        connection.callProcedure("updatePlayer", player.getId(), player.getName(), player.getSurname(), player.getElo(), player.getCategory());
    }

    private Player readPlayerFromRow(ResultSet row) throws SQLException {
        Player result = new Player();
        result.setId(row.getInt("id"));
        result.setName(row.getString("name"));
        result.setSurname(row.getString("surname"));
        result.setCategory(row.getString("category"));
        result.setElo(row.getInt("elo"));
        return result;
    }
}
