package com.tlijani.ai_TruthPulse.Config;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {

    @Bean
    public ChatClient chatClient(ChatModel chatModel){
        return ChatClient.builder(chatModel).build() ;
    }
}