package com.chessdb.API.organizer;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.organizer.models.Organizer;
import com.chessdb.API.organizer.services.OrganizerService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("organizer")
public class OrganizerAPI extends RepositoryAPI<Organizer, String> {

    @GetMapping("/count-tournament/{id}")
    public int getTournamentCount(@PathVariable String id) throws SQLException {
        return organizerService.countTournaments(id);
    }

    @Autowired
    private OrganizerService organizerService;

    @Override
    protected RepositoryService<Organizer, String> getRepositoryService() {
        return organizerService;
    }
}
