package com.chessdb.API;

import com.chessdb.API.player.models.Player;
import com.chessdb.API.player.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequestMapping("player")
public class PlayerAPI {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/all")
    public Player[] getPlayers() throws SQLException {
        return playerService.getAllPlayers();
    }

    @PostMapping("")
    public void insertPlayer(@RequestBody Player player) throws SQLException {
        playerService.insertPlayer(player);
    }

    @PutMapping("")
    public void updatePlayer(@RequestBody Player player) throws SQLException {
        playerService.updatePlayer(player);
    }

}
