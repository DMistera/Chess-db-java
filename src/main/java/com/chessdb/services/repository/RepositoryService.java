package com.chessdb.services.repository;

import com.chessdb.services.database.DatabaseConnection;
import com.chessdb.services.database.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public abstract class RepositoryService<T, IDType> implements Repository<T, IDType> {

    @Autowired
    protected DatabaseConnection connection;

    @Override
    public List<T> getAll() throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName());
        List<T> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }

    @Override
    public T get(IDType id) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE ID = ?", id);
        ResultSet resultSet = queryResult.getResultSet();
        if(resultSet.next()) {
            T entity = entityFromRow(resultSet);
            queryResult.close();
            return entity;
        }
        queryResult.close();
        throw new EntityNotFoundException(id);
    }

    @Override
    public void insert(T t)  throws SQLException {
        Object[] properties;
        if(getEntityID(t) instanceof Integer) {
            properties = getEntityProperties(t);
        }
        else {
            properties = getEntityPropertiesWithID(t);
        }
        connection.callProcedure( getEntityName() + ".insert_" + getEntityName(), properties);
    }

    @Override
    public void update(T t) throws SQLException {
        connection.callProcedure( getEntityName() + ".update_" + getEntityName(), getEntityPropertiesWithID(t));
    }

    @Override
    public void delete(IDType id)  throws SQLException {
        connection.callProcedure( getEntityName() + ".delete_" + getEntityName(), id);
    }

    protected Object[] getEntityPropertiesWithID(T t) {
        Object[] properties = getEntityProperties(t);
        Object[] list = new Object[1 + properties.length];
        list[0] = getEntityID(t);
        System.arraycopy(properties, 0, list, 1, properties.length);
        return list;
    }

    protected List<T> queryResultToList(ResultSet queryResult) throws SQLException {
        List<T> list = new ArrayList<>();
        while(queryResult.next()) {
            list.add(entityFromRow(queryResult));
        }
        return list;
    }

    protected abstract String getEntityName();
    protected abstract IDType getEntityID(T t);
    protected abstract String getTableName();
    protected abstract Object[] getEntityProperties(T t);
    protected abstract T entityFromRow(ResultSet row) throws SQLException;
}
