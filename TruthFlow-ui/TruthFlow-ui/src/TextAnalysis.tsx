import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

interface Suggestion {
    title: string;
    description: string;
    startIndex: number;
    endIndex: number;
    type: 'RED' | 'BLUE' | 'GREEN';  
}

const TextAnalysis: React.FC = () => {
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeText = useCallback(
        debounce(async (content: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.post('/api/suggestions', { content });
                if (Array.isArray(response.data)) {
                    setSuggestions(response.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('Error analyzing text:', error);
                setSuggestions([]);
                setError('Failed to fetch suggestions. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (text.trim()) {
            analyzeText(text);
        } else {
            setSuggestions([]);
        }
    }, [text, analyzeText]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const getHighlightedText = useCallback(() => {
        if (!text || suggestions.length === 0) return text;

        let result = text;
        [...suggestions].sort((a, b) => b.startIndex - a.startIndex).forEach((suggestion) => {
            const { startIndex, endIndex, type } = suggestion;
            if (startIndex >= 0 && endIndex <= text.length && startIndex < endIndex) {
                let underlineClass = '';
                switch (type) {
                    case 'RED':
                        underlineClass = 'border-red-500';
                        break;
                    case 'BLUE':
                        underlineClass = 'border-blue-500';
                        break;
                    case 'GREEN':
                        underlineClass = 'border-green-500';
                        break;
                    default:
                        underlineClass = 'border-gray-500';
                }
                const highlightedPart = `<span class="border-b-2 ${underlineClass}">${text.slice(startIndex, endIndex)}</span>`;
                result = result.slice(0, startIndex) + highlightedPart + result.slice(endIndex);
            }
        });
        return result;
    }, [text, suggestions]);

    return (
        <div className="flex h-screen">
            <div className="w-1/3 p-4 bg-gray-100">
                <textarea
                    className="w-full h-full p-2 border border-gray-300 rounded"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Start typing here..."
                />
            </div>
            <div className="w-1/3 p-4 bg-white overflow-y-auto">
                <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
                />
            </div>
            <div className="w-1/3 p-4 bg-gray-50 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Suggestions</h2>
                {error && <p className="text-red-500">{error}</p>}
                {isLoading ? (
                    <p>Loading suggestions...</p>
                ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <div key={index} className="mb-4 p-2 border border-gray-200 rounded">
                            <h3 className="font-semibold">{suggestion.title}</h3>
                            <p>{suggestion.description}</p>
                            <p className="text-sm mt-1">
                                Type: {suggestion.type === 'RED' ? 'Inaccurate' : suggestion.type === 'BLUE' ? 'Suggestion' : 'Accurate'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No suggestions available Now.</p>
                )}
            </div>
        </div>
    );
};

export default TextAnalysis;