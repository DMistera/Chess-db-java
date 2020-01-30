package com.chessdb.API.tournament;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.prize.models.Prize;
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
    public List<Tournament> getRefereeTournaments(@PathVariable int id) throws SQLException {
        return tournamentService.getRefereeTournaments(id);
    }

    @GetMapping("/player/{id}")
    public List<Tournament> getPlayerTournaments(@PathVariable int id) throws SQLException {
        return tournamentService.getPlayerTournaments(id);
    }

    @GetMapping("/prize/{id}")
    public List<Prize> getPrizes(@PathVariable int id) throws SQLException {
        return tournamentService.getPrizes(id);
    }

    @GetMapping("/media-patron/{id}")
    public List<Tournament> getMediaPatronTournaments(@PathVariable String id) throws SQLException {
        return tournamentService.getMediaPatronTournaments(id);
    }

    @GetMapping("/count-player/{id}")
    public int getPlayerCount(@PathVariable int id) throws SQLException {
        return tournamentService.countPlayers(id);
    }

    @GetMapping("/count-referee/{id}")
    public int getRefereeCount(@PathVariable int id) throws SQLException {
        return tournamentService.countReferees(id);
    }

    @GetMapping("/count-sponsor/{id}")
    public int getSponsorCount(@PathVariable int id) throws SQLException {
        return tournamentService.countSponsors(id);
    }

    @GetMapping("/count-game/{id}")
    public int getGameCount(@PathVariable int id) throws SQLException {
        return tournamentService.countGames(id);
    }

    @GetMapping("/count-patron/{id}")
    public int getPatronCount(@PathVariable int id) throws SQLException {
        return tournamentService.countPatrons(id);
    }

    @PutMapping("/add-game/{id}")
    public void addGame(@PathVariable int id, @RequestBody int game_id) throws SQLException {
        tournamentService.addGame(id, game_id);
    }

    @PutMapping("/add-player/{id}")
    public void addPlayer(@PathVariable int id, @RequestBody int player_id) throws SQLException {
        tournamentService.addPlayer(id, player_id);
    }

    @PutMapping("/add-referee/{id}")
    public void addReferee(@PathVariable int id, @RequestBody int refereeID) throws SQLException {
        tournamentService.addReferee(id, refereeID);
    }

    @PutMapping("/add-patron/{id}")
    public void addPatron(@PathVariable int id, @RequestBody String patronName) throws SQLException {
        tournamentService.addPatron(id, patronName);
    }

    @PutMapping("/remove-game/{id}")
    public void removePlayer(@PathVariable int id) throws SQLException {
        tournamentService.removeGame(id);
    }

    @PutMapping("/remove-player/{id}")
    public void removePlayer(@PathVariable int id, @RequestBody int player_id) throws SQLException {
        tournamentService.removePlayer(id, player_id);
    }

    @PutMapping("/remove-referee/{id}")
    public void removeReferee(@PathVariable int id, @RequestBody int refereeID) throws SQLException {
        tournamentService.removeReferee(id, refereeID);
    }

    @PutMapping("/remove-patron/{id}")
    public void removePatron(@PathVariable int id, @RequestBody String patronName) throws SQLException {
        tournamentService.removePatron(id, patronName);
    }

    @PutMapping("/add-prize/{id}")
    public void addPrize(@PathVariable int id, @RequestBody Prize prize) throws SQLException {
        tournamentService.addPrize(id, prize);
    }

    @PutMapping("/remove-prize/{id}")
    public void removePrize(@PathVariable int id, @RequestBody Prize prize) throws SQLException {
        tournamentService.removePrize(id, prize);
    }

    @Override
    protected RepositoryService<Tournament, Integer> getRepositoryService() {
        return tournamentService;
    }
}
