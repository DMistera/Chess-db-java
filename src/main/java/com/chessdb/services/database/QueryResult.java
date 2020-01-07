package com.chessdb.services.database;

import lombok.Getter;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class QueryResult {

    public QueryResult(Statement statement, ResultSet resultSet) {
        this.statement = statement;
        this.resultSet = resultSet;
    }

    private Statement statement;

    @Getter
    private ResultSet resultSet;

    public void close() throws SQLException {
        resultSet.close();
        statement.close();
    }

}
