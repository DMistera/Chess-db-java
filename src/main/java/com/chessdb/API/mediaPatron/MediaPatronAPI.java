package com.chessdb.API.mediaPatron;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.mediaPatron.models.MediaPatron;
import com.chessdb.API.mediaPatron.services.MediaPatronService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("media-patron")
public class MediaPatronAPI extends RepositoryAPI<MediaPatron, String> {

    @GetMapping("/tournament/{id}")
    public List<MediaPatron> getTournamentMediaPatrons(@PathVariable int id) throws SQLException {
        return mediaPatronService.getTournamentMediaPatrons(id);
    }

    @GetMapping("/count-tournament/{id}")
    public int getTournamentCount(@PathVariable String id) throws SQLException {
        return mediaPatronService.countTournaments(id);
    }

    @Autowired
    private MediaPatronService mediaPatronService;

    @Override
    protected RepositoryService<MediaPatron, String> getRepositoryService() {
        return mediaPatronService;
    }
}
