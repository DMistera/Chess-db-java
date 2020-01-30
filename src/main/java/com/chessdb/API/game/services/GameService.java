package com.chessdb.API.game.services;

import com.chessdb.API.game.models.Game;
import com.chessdb.API.move.services.MoveService;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.move.Move;
import com.github.bhlangonijr.chesslib.move.MoveList;
import com.github.bhlangonijr.chesslib.pgn.PgnHolder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.ArrayList;


@Service
public class GameService extends RepositoryService<Game, Integer> {

    public String getPGN(int id) throws SQLException{
        MoveService moveService = new MoveService();
        List<com.chessdb.API.move.models.Move> list = moveService.getGamesMoves(id);
        StringBuilder pgn = new StringBuilder();

        int turn=0;
        for(com.chessdb.API.move.models.Move move : list){
            if(turn<move.getTurn()){
                turn=move.getTurn();
                pgn.append(turn).append(". ");
            }
            pgn.append(move.getMoveValue()).append(" ");
        }
        return pgn.toString();
    }


    public void setPGN(int id, String pgn) throws Exception {
        StringBuilder str = new StringBuilder();
        try (Writer writer = new BufferedWriter(new OutputStreamWriter(
                new FileOutputStream("tmp.pgn")))) {
            writer.write(pgn);
        } catch (IOException ex) {
            // Report
        }
        /*ignore*/

        PgnHolder pgnH = new PgnHolder("tmp.pgn");
        pgnH.loadPgn();
        for (com.github.bhlangonijr.chesslib.game.Game game: pgnH.getGame()) {
            game.loadMoveText();
            MoveList moves = game.getHalfMoves();

            Board board = new Board();
            //Replay all the moves from the game and print the final position in FEN format
            int j=1;
            for (Move move: moves) {

                j++;
                connection.callProcedure("game.add_move", id, j/2, board.getSideToMove().toString().toLowerCase().charAt(0), move.toString());

                board.doMove(move);
            }
            if (j>1) break;
        }
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
