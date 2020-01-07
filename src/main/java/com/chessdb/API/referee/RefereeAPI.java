package com.chessdb.API.referee;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.referee.models.Referee;
import com.chessdb.API.referee.services.RefereeService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;

public class RefereeAPI extends RepositoryAPI<Referee, Integer> {

    @Autowired
    private RefereeService refereeService;

    @Override
    protected RepositoryService<Referee, Integer> getRepositoryService() {
        return refereeService;
    }
}
