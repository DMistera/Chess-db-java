package com.chessdb.API.tournament.services;

import com.chessdb.API.tournament.models.Tournament;
import com.chessdb.services.database.DatabaseConnection;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TournamentService extends RepositoryService<Tournament> {

    @Override
    protected String getEntityName() {
        return "Tournament";
    }

    @Override
    protected int getEntityID(Tournament tournament) {
        return tournament.getId();
    }

    @Override
    protected String getTableName() {
        return "Tournaments";
    }

    @Override
    protected Object[] getEntityProperties(Tournament tournament) {
        return new Object[] {
                tournament.getName(), tournament.getStartDate(), tournament.getEndDate(), tournament.getEntryFee(), tournament.getLocation()
        };
    }

    @Override
    protected Tournament entityFromRow(ResultSet row) throws SQLException {
        Tournament result = new Tournament();
        result.setId(row.getInt("id"));
        result.setName(row.getString("name"));
        result.setStartDate(row.getDate("start_date"));
        result.setEndDate(row.getDate("end_date"));
        result.setEntryFee(row.getFloat("entry_fee"));
        result.setLocation(row.getString("location"));
        return result;
    }
}
