package com.chessdb.API.game;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.game.models.Game;
import com.chessdb.API.game.services.GameService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("game")
public class GameAPI extends RepositoryAPI<Game, Integer> {

    @Autowired
    GameService gameService;

    @Override
    protected RepositoryService<Game, Integer> getRepositoryService() {
        return gameService;
    }
}
