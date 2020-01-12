package com.chessdb.API.tournament;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.tournament.models.Tournament;
import com.chessdb.API.tournament.services.TournamentService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("tournament")
public class TournamentAPI extends RepositoryAPI<Tournament, Integer> {

    @Autowired
    private TournamentService tournamentService;

    @GetMapping("/organizer/{id}")
    public List<Tournament> getOrganizerTournaments(@PathVariable String id) throws SQLException {
        return tournamentService.getOrganizerTournaments(id);
    }

    @GetMapping("/referee/{id}")
    public List<Tournament> getRefereeTournaments(@PathVariable String id) throws SQLException {
        return tournamentService.getOrganizerTournaments(id);
    }

    @Override
    protected RepositoryService<Tournament, Integer> getRepositoryService() {
        return tournamentService;
    }
}
