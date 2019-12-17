package com.chessdb.API.player;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.player.models.Player;
import com.chessdb.API.player.services.PlayerService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("player")
public class PlayerAPI extends RepositoryAPI<Player, Integer> {

    @Autowired
    private PlayerService playerService;

    @Override
    protected RepositoryService<Player, Integer> getRepositoryService() {
        return playerService;
    }
}
