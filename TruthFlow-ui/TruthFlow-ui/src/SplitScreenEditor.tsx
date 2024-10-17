import React, { useState, useEffect, useRef } from 'react';
import {
    headingsPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    MDXEditorMethods,
    quotePlugin,
    thematicBreakPlugin
} from '@mdxeditor/editor';
import { Moon, Sun } from 'lucide-react';

const SplitScreenEditor: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('# Welcome to MDX Editor\n\nThis is a **split-screen** editor.\n\n- Edit on the left\n- See the result on the right');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const editorRef = useRef<MDXEditorMethods>(null);

    const handleRawMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setMarkdown(e.target.value);
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setMarkdown(markdown);
        }
    }, [markdown]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex justify-end p-4 bg-white dark:bg-gray-800">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
                >
                    {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
                </button>
            </div>
            <div className="flex flex-grow">
                <div className="w-1/2 p-4 bg-gray-100 dark:bg-gray-900">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
                        <textarea
                            className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            value={markdown}
                            onChange={handleRawMarkdownChange}
                        />
                    </div>
                </div>
                <div className="w-1/2 p-4 bg-gray-100 dark:bg-gray-900">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full overflow-auto">
                        <MDXEditor
                            ref={editorRef}
                            markdown={markdown}
                            plugins={[
                                headingsPlugin(),
                                listsPlugin(),
                                quotePlugin(),
                                thematicBreakPlugin(),
                                markdownShortcutPlugin()
                            ]}
                            contentEditableClassName="prose dark:prose-invert max-w-full p-4"
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplitScreenEditor;