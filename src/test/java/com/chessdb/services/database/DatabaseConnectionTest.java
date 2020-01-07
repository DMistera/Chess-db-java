package com.chessdb.services.database;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class DatabaseConnectionTest {

    @Autowired
    private DatabaseConnection databaseConnection;

    @Test
    public void should_generateCorrectParamString() {
        assertEquals(databaseConnection.generateParamString(4), "?,?,?,?");
        assertEquals(databaseConnection.generateParamString(2), "?,?");
        assertNotEquals(databaseConnection.generateParamString(2), "?");
    }

    @Test
    public void should_query() {
        assertDoesNotThrow(() -> {
            databaseConnection.query("SELECT * FROM PLAYERS");
        });
        assertDoesNotThrow(() -> {
            databaseConnection.query("SELECT * FROM PLAYERS WHERE ID = ?", 2);
        });
    }

}
