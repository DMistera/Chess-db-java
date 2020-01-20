package com.chessdb.API.prize.services;

import com.chessdb.API.prize.models.Prize;
import com.chessdb.API.tournament.models.Tournament;
import com.chessdb.services.database.DatabaseConnection;
import com.chessdb.services.database.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PrizeService {

    @Autowired
    private DatabaseConnection connection;

    public List<Prize> getSponsorPrizes(String sponsorName) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM PRIZES WHERE SPONSOR_NAME = ?", sponsorName);
        List<Prize> result = queryResultToPrizeList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    public List<Prize> queryResultToPrizeList(ResultSet resultSet) throws SQLException {
        List<Prize> list = new ArrayList<>();
        while(resultSet.next()) {
            list.add(queryResultToPrize(resultSet));
        }
        return list;
    }

    public Prize queryResultToPrize(ResultSet resultSet) throws SQLException {
        Prize prize = new Prize();
        prize.setName(resultSet.getString("name"));
        prize.setQuantity(resultSet.getInt("count"));
        prize.setTournamentID(resultSet.getInt("tournament_id"));
        prize.setSponsorName(resultSet.getString("sponsor_name"));
        return prize;
    }
}
