package com.chessdb.services.repository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(Object id) {
        super("Object not found: " + id);
    }
}
