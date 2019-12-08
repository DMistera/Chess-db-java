package com.chessdb.services.database;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
class InvalidSQLParameterException extends RuntimeException {

    private Object o;

    InvalidSQLParameterException(Object o) {
        this.o = o;
    }

    @Override
    public String getMessage() {
        return "Invalid SQL Parameter " + o;
    }
}
