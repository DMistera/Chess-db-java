package com.chessdb.API.organizer.services;

import com.chessdb.API.organizer.models.Organizer;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class OrganizerService extends RepositoryService<Organizer, String> {
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
        organizer.setName(row.getString("name"));
        return organizer;
    }
}
