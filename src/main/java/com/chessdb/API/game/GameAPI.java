package com.chessdb.API.game;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.game.models.Game;
import com.chessdb.API.game.services.GameService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("game")
public class GameAPI extends RepositoryAPI<Game, Integer> {

    @Autowired
    private GameService gameService;

    @GetMapping("/count-move/{id}")
    public int getMoveCount(@PathVariable int id) throws SQLException {
        return gameService.countMoves(id);
    }

    @GetMapping("/player/{id}")
    public List<Game> getPlayerGames(@PathVariable int id) throws SQLException {
        return gameService.getPlayerGames(id);
    }


    @Override
    protected RepositoryService<Game, Integer> getRepositoryService() {
        return gameService;
    }

    @GetMapping("/{id}/pgn")
    public String getPGN(@PathVariable int id) {
        return gameService.getPGN(id);
    }

    @PostMapping("/{id}/pgn")
    public void setPGN(@PathVariable int id, @RequestBody String pgn) {
        gameService.setPGN(id, pgn);
    }
}
