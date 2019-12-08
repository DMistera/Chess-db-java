package com.chessdb.services.database;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.sql.*;

@Service
public class DatabaseConnection {

    private final String host = "admlab2.cs.put.poznan.pl";
    private final String database = "dblab02_students.cs.put.poznan.pl";
    private final String port = "1521";
    private final String username = "inf136773";
    private final String password = "inf136773";
    private Connection connection;

    @PostConstruct
    public void connect() throws SQLException {
        connection = DriverManager.getConnection( "jdbc:oracle:thin:@" + host + ":" + port + "/" + database,username,password);
    }

    public void callProcedure(String functionName, Object... params) throws SQLException {
        String callStr = "{call " + functionName + "(" + generateParamString(params.length) + ")}";
        CallableStatement statement = connection.prepareCall(callStr);
        convertParameters(statement, 1, params);
        statement.execute();
        statement.close();
    }

    public Object callFunction(String functionName, int outputType, Object... params) throws SQLException {
        String callStr = "{? = call " + functionName + "(" + generateParamString(params.length) + ")}";
        CallableStatement statement = connection.prepareCall(callStr);
        convertParameters(statement, 2, params);
        statement.registerOutParameter(1, outputType);
        statement.execute();
        Object result;
        if(outputType == Types.INTEGER) {
            result = statement.getInt(1);
        }
        else if(outputType == Types.VARCHAR) {
            result = statement.getString(1);
        }
        else {
            throw new InvalidSQLParameterException(outputType);
        }
        statement.close();
        return result;
    }

    public ResultSet query(String statementStr, Object... params) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(statementStr);
        convertParameters(statement, 1, params);
        return statement.executeQuery();
    }

    private void convertParameters(PreparedStatement statement, int offset, Object... params) throws SQLException {
        for(int i = offset; i < params.length + offset; i++) {
            Object o = params[i - offset];
            if(o instanceof Integer) {
                statement.setInt(i, (int)o);
            }
            else if(o instanceof String) {
                statement.setString(i, (String)o);
            }
            else {
                throw new InvalidSQLParameterException(o);
            }
        }
    }

    public String generateParamString(int count) {
        StringBuilder builder = new StringBuilder();
        String separator = "";
        for(int i = 0; i < count; i++) {
            builder.append(separator);
            separator = ",";
            builder.append("?");
        }
        return builder.toString();
    }

    @PreDestroy
    public void disconnect() throws SQLException {
        connection.close();
    }
}
