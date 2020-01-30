package com.chessdb.API.game.services;

import com.chessdb.API.game.models.Game;
import com.chessdb.API.move.services.MoveService;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Piece;
import com.github.bhlangonijr.chesslib.move.Move;
import com.github.bhlangonijr.chesslib.move.MoveList;
import com.github.bhlangonijr.chesslib.pgn.PgnHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.ArrayList;


@Service
public class GameService extends RepositoryService<Game, Integer> {

    @Autowired
    MoveService moveService;


    public List<String> getPGN(int id) throws SQLException{

        List<com.chessdb.API.move.models.Move> list = moveService.getGamesMoves(id);
        List<String> result = new ArrayList<>();
        for(com.chessdb.API.move.models.Move move : list){
            result.add(move.getMoveValue());
        }
        return result;
    }


    public void setPGN(int id, String pgn) throws Exception {
        connection.callProcedure("game.delete_moves", id);
        StringBuilder pgn2 = new StringBuilder();
        pgn2.append("[Event \"F/S Return Match\"]\n");
        pgn2.append("[Site \"Belgrade\"]\n");
        pgn2.append("[Date \"1992.11.04\"]\n");
        pgn2.append("[Round \"29\"]");
        pgn2.append("[White \"Fischer, Robert J.\"]\n");
        pgn2.append("[Black \"Spassky, Boris V.\"]\n");
        pgn2.append("[Result \"1/2-1/2\"]\n");
        pgn2.append(pgn);
        try (Writer writer = new BufferedWriter(new OutputStreamWriter(
                new FileOutputStream("tmp.pgn")))) {
            writer.write(pgn2.toString());
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
                Piece piece;
                piece=board.getPiece(move.getFrom());
                StringBuilder moveValue = new StringBuilder();
                if((piece!=Piece.WHITE_PAWN)&&(piece!=Piece.BLACK_PAWN)){
                    if((piece== Piece.BLACK_KNIGHT)||(piece==Piece.WHITE_KNIGHT))
                    {
                        moveValue.append('N');
                    }
                    else moveValue.append(piece.name().charAt(6));
                }
                moveValue.append(move.toString());

                j++;

                connection.callProcedure("game.add_move", id, j/2, board.getSideToMove().toString().toLowerCase().charAt(0), moveValue.toString());


                board.doMove(move);
            }
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

    public List<Game> getTournamentGames(int tournamentID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE TOURNAMENT_ID = ?", tournamentID);
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
