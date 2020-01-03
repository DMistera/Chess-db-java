package com.chessdb.API.game.services;

import com.chessdb.API.game.models.Game;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class GameService extends RepositoryService<Game, Integer> {
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
