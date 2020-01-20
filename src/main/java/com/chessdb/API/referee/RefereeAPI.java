package com.chessdb.API.referee;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.referee.models.Referee;
import com.chessdb.API.referee.services.RefereeService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("referee")
public class RefereeAPI extends RepositoryAPI<Referee, Integer> {

    @GetMapping("/tournament/{id}")
    public List<Referee> getTournamentPlayers(@PathVariable int id) throws SQLException {
        return refereeService.getTournamentReferees(id);
    }

    @Autowired
    private RefereeService refereeService;

    @Override
    protected RepositoryService<Referee, Integer> getRepositoryService() {
        return refereeService;
    }
}
