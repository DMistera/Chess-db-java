package com.chessdb.services.repository;


import java.sql.SQLException;

public interface Repository<T> {
    public T[] getAll() throws SQLException;
    public T get(int id) throws SQLException ;
    public void insert(T t) throws SQLException ;
    public void update(T t) throws SQLException ;
    public void delete(int id) throws SQLException ;
}
