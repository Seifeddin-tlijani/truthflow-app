package com.tlijani.ai_TruthPulse.Services;

import com.tlijani.ai_TruthPulse.Suggestions.Suggestion;

import java.util.List;

public interface SuggestionService {

    List<Suggestion> suggest(String content) ;
}
