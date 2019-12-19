package com.chessdb.services.repository;

import com.chessdb.services.database.DatabaseConnection;
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
        List<T> list = new ArrayList<>();
        ResultSet queryResult = connection.query("SELECT * FROM " + getTableName());
        while(queryResult.next()) {
            list.add(entityFromRow(queryResult));
        }
        queryResult.close();
        return list;
    }

    @Override
    public T get(IDType id) throws SQLException {
        ResultSet queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE ID = ?", id);
        if(queryResult.next()) {
            return entityFromRow(queryResult);
        }
        queryResult.close();
        throw new EntityNotFoundException();
    }

    @Override
    public void insert(T t)  throws SQLException {
        connection.callProcedure( getEntityName() + ".insert_" + getEntityName(), getEntityProperties(t));
    }

    @Override
    public void update(T t) throws SQLException {
        Object[] properties = getEntityProperties(t);
        Object[] list = new Object[1 + properties.length];
        list[0] = getEntityID(t);
        System.arraycopy(properties, 0, list, 1, properties.length);
        connection.callProcedure( getEntityName() + ".update_" + getEntityName(), list);
    }

    @Override
    public void delete(IDType id)  throws SQLException {
        connection.callProcedure( getEntityName() + ".delete_" + getEntityName(), id);
    }

    protected abstract String getEntityName();
    protected abstract IDType getEntityID(T t);
    protected abstract String getTableName();
    protected abstract Object[] getEntityProperties(T t);
    protected abstract T entityFromRow(ResultSet row) throws SQLException;
}
