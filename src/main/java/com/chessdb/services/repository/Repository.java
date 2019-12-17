package com.chessdb.services.repository;


import java.sql.SQLException;
import java.util.List;

public interface Repository<T, IDType> {
    public List<T> getAll() throws SQLException;
    public T get(IDType id) throws SQLException ;
    public void insert(T t) throws SQLException ;
    public void update(T t) throws SQLException ;
    public void delete(IDType id) throws SQLException ;
}
