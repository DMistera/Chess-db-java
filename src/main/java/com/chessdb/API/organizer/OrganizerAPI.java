package com.chessdb.API.organizer;

import com.chessdb.API.RepositoryAPI;
import com.chessdb.API.organizer.models.Organizer;
import com.chessdb.API.organizer.services.OrganizerService;
import com.chessdb.services.repository.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("organizer")
public class OrganizerAPI extends RepositoryAPI<Organizer, String> {
    @Autowired
    private OrganizerService organizerService;

    @Override
    protected RepositoryService<Organizer, String> getRepositoryService() {
        return organizerService;
    }
}
