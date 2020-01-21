package com.chessdb.API.referee.services;

import com.chessdb.API.referee.models.Referee;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Service
public class RefereeService extends RepositoryService<Referee, Integer> {

    public int countTournaments(int id) throws SQLException {
        return (int)this.connection.callFunction(getEntityName() + ".count_tournaments", Types.INTEGER, id);
    }

    public List<Referee> getTournamentReferees(int tournamentID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE ID IN (SELECT REFEREE_ID FROM REFERING WHERE TOURNAMENT_ID = ?)", tournamentID);
        List<Referee> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

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
        referee.setId(row.getInt("id"));
        referee.setName(row.getString("name"));
        referee.setSurname(row.getString("surname"));
        return referee;
    }
}
