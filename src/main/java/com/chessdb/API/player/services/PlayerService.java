package com.chessdb.API.player.services;

import com.chessdb.API.player.models.Player;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class PlayerService extends RepositoryService<Player> {

    @Override
    protected String getEntityName() {
        return "Player";
    }

    @Override
    protected int getEntityID(Player player) {
        return player.getId();
    }

    @Override
    protected String getTableName() {
        return "Players";
    }

    @Override
    protected Object[] getEntityProperties(Player player) {
        return new Object[] {
            player.getName(), player.getSurname(), player.getElo(), player.getCategory()
        };
    }

    @Override
    protected Player entityFromRow(ResultSet row) throws SQLException {
        Player result = new Player();
        result.setId(row.getInt("id"));
        result.setName(row.getString("name"));
        result.setSurname(row.getString("surname"));
        result.setCategory(row.getString("category"));
        result.setElo(row.getInt("elo"));
        return result;
    }
}
