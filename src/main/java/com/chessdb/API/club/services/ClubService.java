package com.chessdb.API.club.services;

import com.chessdb.API.club.models.Club;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

@Service
public class ClubService extends RepositoryService<Club, Integer> {

    public int countPlayers(int id) throws SQLException {
        return (int)connection.callFunction("club.count_players", Types.INTEGER, id);
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
