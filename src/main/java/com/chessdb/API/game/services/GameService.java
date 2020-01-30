package com.chessdb.API.game.services;

import com.chessdb.API.game.models.Game;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Service
public class GameService extends RepositoryService<Game, Integer> {

    public String getPGN(int id) {
        //TODO
        return "tt";
    }

    public void setPGN(int id, String pgn) {
        //TODO
    }

    public int countMoves(int id) throws SQLException {
        return (int)this.connection.callFunction(getEntityName() + ".count_moves", Types.INTEGER, id);
    }

    public List<Game> getPlayerGames(int playerID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE PLAYER_ID_WHITE = ? OR PLAYER_ID_BLACK = ?", playerID, playerID);
        List<Game> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    @Override
    protected String getEntityName() {
        return "Game";
    }

    @Override
    protected Integer getEntityID(Game game) {
        return game.getId();
    }

    @Override
    protected String getTableName() {
        return "Games";
    }

    @Override
    protected Object[] getEntityProperties(Game game) {
        Integer tournamentID = game.getTournamentID() > 0 ? game.getTournamentID() : null;
        return new Object[] {
                game.getWhitePlayerID(),  game.getBlackPlayerID(), game.getResult(), game.getDate(), tournamentID
        };
    }

    @Override
    protected Game entityFromRow(ResultSet row) throws SQLException {
        Game game = new Game();
        game.setId(row.getInt("id"));
        game.setResult(row.getString("result").charAt(0));
        game.setDate(row.getDate("game_date"));
        game.setWhitePlayerID(row.getInt("player_id_white"));
        game.setBlackPlayerID(row.getInt("player_id_black"));
        game.setTournamentID(row.getInt("tournament_id"));
        return game;
    }
}
