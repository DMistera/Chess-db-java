package com.chessdb.API;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlayersAPI {

    @RequestMapping("/players")
    public String players() {
        return "";
    }
}
