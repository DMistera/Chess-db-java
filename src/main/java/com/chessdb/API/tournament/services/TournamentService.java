package com.chessdb.API.tournament.services;

import com.chessdb.API.tournament.models.Tournament;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Service
public class TournamentService extends RepositoryService<Tournament, Integer> {

    public void addPlayer(int tournamentID, int playerID) throws SQLException {
        connection.callProcedure("tournament.add_player", tournamentID, playerID);
    }

    public void addReferee(int tournamentID, int refereeID) throws SQLException {
        connection.callProcedure("tournament.add_referee", tournamentID, refereeID);
    }

    public void addPatron(int tournamentID, String patron) throws SQLException {
        connection.callProcedure("tournament.add_patron", tournamentID, patron);
    }

    public void addOrganizer(int tournamentID, String organizer) throws SQLException {
        connection.callProcedure("tournament.add_organizer", tournamentID, organizer);
    }

    public void addPrize(int tournamentID, String prizeName, int amount, String sponsorName) throws SQLException {
        connection.callProcedure("tournament.add_prize", tournamentID, prizeName, amount, sponsorName);
    }

    public int countPlayers(int id) throws SQLException {
        return (int)connection.callFunction("tournament.count_players", Types.INTEGER, id);
    }

    public int countReferees(int id) throws SQLException {
        return (int)connection.callFunction("tournament.count_referees", Types.INTEGER, id);
    }

    public int countSponsors(int id) throws SQLException {
        return (int)connection.callFunction("tournament.count_sponsors", Types.INTEGER, id);
    }

    public int countOrganizers(int id) throws SQLException {
        return (int)connection.callFunction("tournament.count_organizers", Types.INTEGER, id);
    }

    public int countGames(int id) throws SQLException {
        return (int)connection.callFunction("tournament.count_games", Types.INTEGER, id);
    }

    public int countPatrons(int id) throws SQLException {
        return (int)connection.callFunction("tournament.count_patrons", Types.INTEGER, id);
    }

    public List<Tournament> getOrganizerTournaments(String organizerName) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE ORGANIZER_NAME = ?", organizerName);
        List<Tournament> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    public List<Tournament> getRefereeTournaments(int refereeID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM TOURNAMENTS WHERE ID IN (SELECT TOURNAMENT_ID FROM REFERING WHERE REFEREE_ID = ?)", refereeID);
        List<Tournament> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    @Override
    protected String getEntityName() {
        return "Tournament";
    }

    @Override
    protected Integer getEntityID(Tournament tournament) {
        return tournament.getId();
    }

    @Override
    protected String getTableName() {
        return "Tournaments";
    }

    @Override
    protected Object[] getEntityProperties(Tournament tournament) {
        return new Object[] {
                tournament.getName(), tournament.getStartDate(), tournament.getEndDate(), tournament.getEntryFee(), tournament.getLocation(), tournament.getOrganizerName()
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
        result.setOrganizerName(row.getString("organizer_name"));
        return result;
    }
}
