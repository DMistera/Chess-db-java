package com.chessdb.API.club.services;

import com.chessdb.API.club.models.Club;
import com.chessdb.services.repository.RepositoryService;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ClubService extends RepositoryService<Club, String> {
    @Override
    protected String getEntityName() {
        return "Club";
    }

    @Override
    protected String getEntityID(Club o) {
        return o.getName();
    }

    @Override
    protected String getTableName() {
        return "Clubs";
    }

    @Override
    protected Object[] getEntityProperties(Club o) {
        return new Object[0];
    }

    @Override
    protected Club entityFromRow(ResultSet row) throws SQLException {
        Club result = new Club();
        result.setName(row.getString("name"));
        return result;
    }
}
