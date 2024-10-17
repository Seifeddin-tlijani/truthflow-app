package com.tlijani.ai_TruthPulse.Suggestions;

/**
 * A suggestion about the content.
 * @param title The title of the suggestion.
 * @param description The helpful description of the suggestion.
 * @param startIndex The start index of the content to which it relates.
 * @param endIndex The end index of the content to which it relates.
 * @param type The suggetsion type.
 */public record Suggestion(
        String title,
        String description,
        int startIndex,
        int endIndex,
        SuggestionType type
) {
    public enum SuggestionType {
        RED,
        BLUE,
        GREEN
    }
}