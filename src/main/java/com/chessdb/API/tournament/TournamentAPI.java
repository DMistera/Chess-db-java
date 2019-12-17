package com.chessdb.API.tournament;

import com.chessdb.API.tournament.models.Tournament;
import com.chessdb.API.tournament.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("tournament")
public class TournamentAPI {
    @Autowired
    private TournamentService tournamentService;

    @GetMapping("")
    public List<Tournament> getPlayers() throws SQLException {
        return tournamentService.getAll();
    }

    @PostMapping("")
    public void insertPlayer(@RequestBody Tournament player) throws SQLException {
        tournamentService.insert(player);
    }

    @PutMapping("")
    public void updatePlayer(@RequestBody Tournament player) throws SQLException {
        tournamentService.update(player);
    }

    @DeleteMapping("{id}")
    public void updatePlayer(@PathVariable int id) throws SQLException {
        tournamentService.delete(id);
    }
}
