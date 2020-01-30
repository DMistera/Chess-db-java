package com.chessdb.API.sponsor.services;

import com.chessdb.API.prize.models.Prize;
import com.chessdb.API.sponsor.models.Sponsor;
import com.chessdb.API.tournament.models.Tournament;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Service
public class SponsorService extends RepositoryService<Sponsor, String> {

    public int countTournaments(String id) throws SQLException {
        return (int)this.connection.callFunction(getEntityName() + ".count_tournaments", Types.INTEGER, id);
    }

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
        sponsor.setName(row.getString("id"));
        return sponsor;
    }
}
