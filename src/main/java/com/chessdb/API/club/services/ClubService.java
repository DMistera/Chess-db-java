package com.chessdb.API.club.services;

import com.chessdb.API.club.models.Club;
import com.chessdb.API.player.models.Player;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Service
public class ClubService extends RepositoryService<Club, Integer> {

    public int countPlayers(int id) throws SQLException {
        return (int)connection.callFunction(getEntityName() + ".count_players", Types.INTEGER, id);
    }

    public void addPlayer(int clubID, int playerID) throws SQLException {
        connection.callProcedure("club.add_player", clubID, playerID);
    }

    @Override
    protected String getEntityName() {
        return "Club";
    }

    @Override
    protected Integer getEntityID(Club o) {
        return o.getId();
    }

    @Override
    protected String getTableName() {
        return "Clubs";
    }

    @Override
    protected Object[] getEntityProperties(Club o) {
        return new Object[] {o.getName()};
    }

    @Override
    protected Club entityFromRow(ResultSet row) throws SQLException {
        Club result = new Club();
        result.setId(row.getInt("id"));
        result.setName(row.getString("name"));
        return result;
    }
}
