package com.chessdb.API.game.services;

import com.chessdb.API.game.models.Game;
import com.chessdb.services.repository.RepositoryService;
import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Piece;
import com.github.bhlangonijr.chesslib.Side;
import com.github.bhlangonijr.chesslib.Square;
import com.github.bhlangonijr.chesslib.move.Move;
import com.github.bhlangonijr.chesslib.move.MoveList;
import com.github.bhlangonijr.chesslib.pgn.PgnHolder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;



@Service
public class GameService extends RepositoryService<Game, Integer> {

    public String getPGN(int id) {
        StringBuilder pgn = new StringBuilder();
        // Creates a new chessboard in the standard initial position
        Board board = new Board();
        Square start= Square.E2;
        Square end = Square.E4;
        Piece piece;
        int counter= 0;
        try {
            counter = (int) connection.callFunction("count_moves", id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        for(int i=1; i<=counter; i++) {
            //Make a move from E2 to E4 squares

            pgn.append(i).append(". ");
            for(int j=0; j<2; j++){
                //TODO przypisanie do start & end field
                //end=Square.valueOf(String field.toUpperCase());
                piece=board.getPiece(start);
                {
                    if((piece==Piece.BLACK_KNIGHT)||(piece==Piece.WHITE_KNIGHT))
                    {
                        pgn.append('N');
                    }
                    pgn.append(piece.name().charAt(6));
                }
                piece=board.getPiece(end);
                if(piece!=Piece.NONE) pgn.append('x').append(end.value());

                board.doMove(new Move(start, end));
                if((piece!=Piece.BLACK_PAWN)&&(piece!=Piece.WHITE_PAWN))

                if(board.isDraw()||board.isStaleMate())
                {
                    pgn.append(" 1/2-1/2");
                    return pgn.toString();
                }
                if(board.isMated()){
                    if(j==1){
                        pgn.append(" 0-1");
                        return pgn.toString();
                    }
                    else {
                        pgn.append(" 1-0");
                        return pgn.toString();
                    }
                }
                if(board.isKingAttacked()) pgn.append('+');
                pgn.append(" ");
            }

        }
        return pgn.toString();
    }

    public void setPGN(int id, String pgn) throws Exception {

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
            for (Move move: moves) {


                connection.callProcedure("game.add_move", id, board.getHalfMoveCounter(), board.getSideToMove().toString().charAt(0), move.getFrom().toString(), move.getTo().toString());
                //System.out.println("Ruch "+id+" "+" "+board.getHalfMoveCounter();+" "+" "+board.getSideToMove()+" "+" "+move.getFrom()+" "+move.getTo(), move.toString());

                board.doMove(move);
            }
        }
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
