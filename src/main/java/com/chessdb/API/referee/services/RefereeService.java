package com.chessdb.API.referee.services;

import com.chessdb.API.referee.models.Referee;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class RefereeService extends RepositoryService<Referee, Integer> {
    @Override
    protected String getEntityName() {
        return "referee";
    }

    @Override
    protected Integer getEntityID(Referee referee) {
        return referee.getId();
    }

    @Override
    protected String getTableName() {
        return "referees";
    }

    @Override
    protected Object[] getEntityProperties(Referee referee) {
        return new Object[] {referee.getName(), referee.getSurname()};
    }

    @Override
    protected Referee entityFromRow(ResultSet row) throws SQLException {
        Referee referee = new Referee();
        referee.setName(row.getString("name"));
        referee.setSurname(row.getString("surname"));
        return referee;
    }
}
