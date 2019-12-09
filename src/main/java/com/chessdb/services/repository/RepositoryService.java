package com.chessdb.services.repository;

import com.chessdb.services.database.DatabaseConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public abstract class RepositoryService<T> implements Repository<T> {

    @Autowired
    private DatabaseConnection connection;

    @Override
    public T[] getAll() throws SQLException {
        List<T> list = new ArrayList<>();
        ResultSet queryResult = connection.query("SELECT * FROM " + getTableName());
        while(queryResult.next()) {
            list.add(entityFromRow(queryResult));
        }
        Object[] result = new Object[list.size()];
        return (T[])list.toArray(result);
    }

    @Override
    public T get(int id) throws SQLException {
        ResultSet queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE ID = ?", id);
        if(queryResult.next()) {
            return entityFromRow(queryResult);
        }
        throw new EntityNotFoundException();
    }

    @Override
    public void insert(T t)  throws SQLException {
        connection.callProcedure( getEntityName() + ".insert" + getEntityName(), getEntityProperties(t));
    }

    @Override
    public void update(T t) throws SQLException {
        connection.callProcedure( getEntityName() + ".update" + getEntityName(), getEntityID(t), getEntityProperties(t));
    }

    @Override
    public void delete(int id)  throws SQLException {
        connection.callProcedure( getEntityName() + ".delete" + getEntityName(), id);
    }

    protected abstract String getEntityName();
    protected abstract int getEntityID(T t);
    protected abstract String getTableName();
    protected abstract Object[] getEntityProperties(T t);
    protected abstract T entityFromRow(ResultSet row) throws SQLException;
}
