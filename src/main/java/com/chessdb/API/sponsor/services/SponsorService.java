package com.chessdb.API.sponsor.services;

import com.chessdb.API.sponsor.models.Sponsor;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class SponsorService extends RepositoryService<Sponsor, String> {
    @Override
    protected String getEntityName() {
        return "sponsor";
    }

    @Override
    protected String getEntityID(Sponsor o) {
        return o.getName();
    }

    @Override
    protected String getTableName() {
        return "sponsors";
    }

    @Override
    protected Object[] getEntityProperties(Sponsor sponsor) {
        return new Object[0];
    }

    @Override
    protected Sponsor entityFromRow(ResultSet row) throws SQLException {
        Sponsor sponsor = new Sponsor();
        sponsor.setName(row.getString("name"));
        return sponsor;
    }
}
