package com.chessdb.API.club;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.club.models.Club;
import com.chessdb.API.club.services.ClubService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("club")
public class ClubAPI extends RepositoryAPI<Club, Integer> {

    @Autowired
    private ClubService clubService;

    @Override
    protected RepositoryService<Club, Integer> getRepositoryService() {
        return clubService;
    }

    @GetMapping("/{id}/count-players")
    public int countPlayers(@PathVariable int id) throws SQLException {
        return  clubService.countPlayers(id);
    }
}
