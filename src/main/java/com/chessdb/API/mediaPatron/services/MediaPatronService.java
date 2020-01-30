package com.chessdb.API.mediaPatron.services;

import com.chessdb.API.mediaPatron.models.MediaPatron;
import com.chessdb.services.database.QueryResult;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Service
public class MediaPatronService extends RepositoryService<MediaPatron, String> {

    public List<MediaPatron> getTournamentMediaPatrons(int tournamentID) throws SQLException {
        QueryResult queryResult = connection.query("SELECT * FROM " + getTableName() + " WHERE ID IN (SELECT MEDIA_PATRON_NAME FROM PATRONING WHERE TOURNAMENT_ID = ?)", tournamentID);
        List<MediaPatron> result = queryResultToList(queryResult.getResultSet());
        queryResult.close();
        return result;
    }


    public int countTournaments(String id) throws SQLException {
        return (int)this.connection.callFunction(getEntityName() + ".count_tournaments", Types.INTEGER, id);
    }

    @Override
    protected String getEntityName() {
        return "media_patron";
    }

    @Override
    protected String getEntityID(MediaPatron mediaPatron) {
        return mediaPatron.getName();
    }

    @Override
    protected String getTableName() {
        return "media_patrons";
    }

    @Override
    protected Object[] getEntityProperties(MediaPatron mediaPatron) {
        return new Object[0];
    }

    @Override
    protected MediaPatron entityFromRow(ResultSet row) throws SQLException {
        MediaPatron mediaPatron = new MediaPatron();
        mediaPatron.setName(row.getString("id"));
        return mediaPatron;
    }
}
