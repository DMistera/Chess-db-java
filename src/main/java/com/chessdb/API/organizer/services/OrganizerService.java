package com.chessdb.API.organizer.services;

import com.chessdb.API.organizer.models.Organizer;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

@Service
public class OrganizerService extends RepositoryService<Organizer, String> {

    public int countTournaments(String id) throws SQLException {
        return (int)this.connection.callFunction(getEntityName() + ".count_tournaments", Types.INTEGER, id);
    }

    @Override
    protected String getEntityName() {
        return "organizer";
    }

    @Override
    protected String getEntityID(Organizer organizer) {
        return organizer.getName();
    }

    @Override
    protected String getTableName() {
        return "organizers";
    }

    @Override
    protected Object[] getEntityProperties(Organizer organizer) {
        return new Object[0];
    }

    @Override
    protected Organizer entityFromRow(ResultSet row) throws SQLException {
        Organizer organizer = new Organizer();
        organizer.setName(row.getString("id"));
        return organizer;
    }
}
