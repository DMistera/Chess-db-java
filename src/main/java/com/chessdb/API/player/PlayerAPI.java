package com.chessdb.API.player;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.player.models.Player;
import com.chessdb.API.player.services.PlayerService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("player")
public class PlayerAPI extends RepositoryAPI<Player, Integer> {

    @GetMapping("/count-game/{id}")
    public int getGameCount(@PathVariable int id) throws SQLException {
        return playerService.countGames(id);
    }

    @GetMapping("/count-tournament/{id}")
    public int getTournamentCount(@PathVariable int id) throws SQLException {
        return playerService.countTournaments(id);
    }

    @GetMapping("/club/{id}")
    public List<Player> getClubPlayers(@PathVariable int id) throws SQLException {
        return playerService.getClubPlayers(id);
    }

    @GetMapping("/tournament/{id}")
    public List<Player> getTournamentPlayers(@PathVariable int id) throws SQLException {
        return playerService.getTournamentPlayers(id);
    }

    @Autowired
    private PlayerService playerService;

    @Override
    protected RepositoryService<Player, Integer> getRepositoryService() {
        return playerService;
    }
}
