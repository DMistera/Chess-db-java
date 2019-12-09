package com.chessdb.API.player;

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

    @GetMapping("")
    public Player[] getPlayers() throws SQLException {
        return playerService.getAll();
    }

    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable int id) throws SQLException {
        return playerService.get(id);
    }

    @PostMapping("")
    public void insertPlayer(@RequestBody Player player) throws SQLException {
        playerService.insert(player);
    }

    @PutMapping("")
    public void updatePlayer(@RequestBody Player player) throws SQLException {
        playerService.update(player);
    }

    @DeleteMapping("/{id}")
    public void updatePlayer(@PathVariable int id) throws SQLException {
        playerService.delete(id);
    }

}
