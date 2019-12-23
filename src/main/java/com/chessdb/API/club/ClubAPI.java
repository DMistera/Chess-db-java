package com.chessdb.API.club;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.club.models.Club;
import com.chessdb.API.club.services.ClubService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequestMapping("club")
public class ClubAPI extends RepositoryAPI<Club, Integer> {

    @Autowired
    private ClubService clubService;

    @GetMapping("/{id}/count-players")
    public int countPlayers(@PathVariable int id) throws SQLException {
        return  clubService.countPlayers(id);
    }

    @PutMapping("/add-player/{id}")
    public void addPlayer(@PathVariable int id, @RequestBody int playerID) throws SQLException {
        clubService.addPlayer(id, playerID);
    }

    @Override
    protected RepositoryService<Club, Integer> getRepositoryService() {
        return clubService;
    }
}
