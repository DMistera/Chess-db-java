package com.chessdb.API.move.services;

import com.chessdb.API.move.models.Move;
import com.chessdb.services.database.DatabaseConnection;
import com.chessdb.services.database.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;




@Service
public class MoveService {

    @Autowired
    private DatabaseConnection connection;

    public List<Move> getGamesMoves(int gameID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM MOVES WHERE GAME_ID = ?", gameID);
        List<Move> result = queryResultToMoveList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    public List<Move> queryResultToMoveList(ResultSet resultSet) throws SQLException {
        List<Move> list = new ArrayList<>();
        while(resultSet.next()) {
            list.add(queryResultToMove(resultSet));
        }
        return list;
    }

    public Move queryResultToMove(ResultSet resultSet) throws SQLException {
        Move move = new Move();
        move.setTurn(resultSet.getInt("turn"));
        move.setColor(resultSet.getString("color").charAt(0));
        move.setGameID(resultSet.getInt("game_id"));
        move.setMoveValue(resultSet.getString("move_value"));
        return move;
    }
}