package com.chessdb.API.club;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.club.models.Club;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("club")
public class ClubAPI extends RepositoryAPI<Club, Integer> {
    @Override
    protected RepositoryService<Club, Integer> getRepositoryService() {
        return null;
    }
}
