package com.chessdb.API.mediaPatron.services;

import com.chessdb.API.mediaPatron.models.MediaPatron;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class MediaPatronService extends RepositoryService<MediaPatron, String> {

    @Override
    protected String getEntityName() {
        return "mediapatron";
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
        mediaPatron.setName(row.getString("name"));
        return mediaPatron;
    }
}
