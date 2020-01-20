package com.chessdb.API;

import com.chessdb.services.repository.RepositoryService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

public abstract class RepositoryAPI<T, IDType> {
    protected abstract RepositoryService<T, IDType> getRepositoryService();

    @GetMapping("")
    public List<T> getAll() throws SQLException {
        return getRepositoryService().getAll();
    }

    @GetMapping("/{id}")
    public T get(@PathVariable IDType id) throws SQLException {
        return getRepositoryService().get(id);
    }

    @PostMapping("")
    public void insert(@RequestBody T entity) throws SQLException {
        getRepositoryService().insert(entity);
    }

    @PutMapping("")
    public void update(@RequestBody T entity) throws SQLException {
        getRepositoryService().update(entity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable IDType id) throws SQLException {
        getRepositoryService().delete(id);
    }
}
