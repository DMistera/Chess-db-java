package com.chessdb.API.player.services;

import com.chessdb.API.player.models.Player;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Service
public class PlayerService extends RepositoryService<Player, Integer> {

    public List<Player> getClubPlayers(int clubID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE CLUB_ID = ?", clubID);
        List<Player> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    public List<Player> getTournamentPlayers(int tournamentID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE ID IN (SELECT PLAYER_ID FROM PARTICIPATION WHERE TOURNAMENT_ID = ?)", tournamentID);
        List<Player> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    public int countTournaments(int id) throws SQLException {
        return (int)connection.callFunction(getEntityName() + ".count_tournaments", Types.INTEGER, id);
    }

    public int countGames(int id) throws SQLException {
        return (int)connection.callFunction(getEntityName() + ".count_games", Types.INTEGER, id);
    }

    @Override
    protected String getEntityName() {
        return "Player";
    }

    @Override
    protected Integer getEntityID(Player player) {
        return player.getId();
    }

    @Override
    protected String getTableName() {
        return "Players";
    }

    @Override
    protected Object[] getEntityProperties(Player player) {
        return new Object[] {
            player.getName(), player.getSurname(), player.getElo(), player.getCategory()
        };
    }

    @Override
    protected Player entityFromRow(ResultSet row) throws SQLException {
        Player result = new Player();
        result.setId(row.getInt("id"));
        result.setName(row.getString("name"));
        result.setSurname(row.getString("surname"));
        result.setCategory(row.getString("category"));
        result.setElo(row.getInt("elo"));
        result.setClubID(row.getInt("club_id"));
        return result;
    }
}
