package com.chessdb.API.sponsor;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.sponsor.models.Sponsor;
import com.chessdb.API.sponsor.services.SponsorService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sponsor")
public class SponsorAPI extends RepositoryAPI<Sponsor, String> {

    @Autowired
    private SponsorService sponsorService;

    @Override
    protected RepositoryService<Sponsor, String> getRepositoryService() {
        return sponsorService;
    }
}
