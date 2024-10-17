package com.tlijani.ai_TruthPulse.Controllers;


import com.tlijani.ai_TruthPulse.DTOs.ContentDto;
import com.tlijani.ai_TruthPulse.Services.SuggestionService;
import com.tlijani.ai_TruthPulse.Suggestions.Suggestion;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/suggestions")
public class SuggestionController {

    private final SuggestionService suggestionService;


    public SuggestionController(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }

    @PostMapping
    public List<Suggestion> postSuggestions(@RequestBody ContentDto contentDto){

        return suggestionService.suggest(contentDto.content());

    }



}
