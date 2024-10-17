package com.tlijani.ai_TruthPulse.Services.Impl;

import com.tlijani.ai_TruthPulse.Services.SuggestionService;
import com.tlijani.ai_TruthPulse.Suggestions.Suggestion;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
public class FactCheckingOllamaSuggestionService implements SuggestionService {

    private static final String SYSTEM_PROMPT = "You are an expert fact checker. "+
            "You ensure content is factually accurate and make suggestions for improvements when it is not, explaining why in a description. " +
            "All suggestions you make are independent. You only make one suggestion per statement. " +
            "You mark very inaccurate statements as red. You mark somewhat inaccurate statements as blue." +
            "You mark accurate statements as green. You do not offer suggestions on statements of opinion. " +
            "You do not need to specify markings in the description." +
            "You specify the statement to which your suggestion relates by providing the index of the start " +
            "and end character of the entire sentence when considering the entire content a character index, " +
            "including whitespace characters.";


    private final ChatClient chatClient;

    public FactCheckingOllamaSuggestionService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }


    @Override
    public List<Suggestion> suggest(String content) {
        if (content.isEmpty()){
            return new ArrayList<>();
        }
        return chatClient.prompt()
                .system(SYSTEM_PROMPT).user(content).call().entity(new ParameterizedTypeReference<List<Suggestion>>() {});
    }
}
