package com.chessdb.API.sponsor;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.prize.models.Prize;
import com.chessdb.API.prize.services.PrizeService;
import com.chessdb.API.sponsor.models.Sponsor;
import com.chessdb.API.sponsor.services.SponsorService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("sponsor")
public class SponsorAPI extends RepositoryAPI<Sponsor, String> {

    @Autowired
    private SponsorService sponsorService;

    @Autowired
    private PrizeService prizeService;

    @Override
    protected RepositoryService<Sponsor, String> getRepositoryService() {
        return sponsorService;
    }

    @GetMapping("/prize/{id}")
    public List<Prize> getPrizes(@PathVariable String id) throws SQLException {
        return prizeService.getSponsorPrizes(id);
    }
}
