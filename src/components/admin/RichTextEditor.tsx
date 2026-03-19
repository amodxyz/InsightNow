'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type EditorButton = {
  icon: string;
  command: string;
  title: string;
  value?: string;
  style?: React.CSSProperties;
};

const formattingGroups: { title: string; buttons: EditorButton[] }[] = [
  {
    title: 'Text Format',
    buttons: [
      { icon: 'B', command: 'bold', title: 'Bold (Ctrl+B)', style: { fontWeight: 'bold' } },
      { icon: 'I', command: 'italic', title: 'Italic (Ctrl+I)', style: { fontStyle: 'italic' } },
      { icon: 'U', command: 'underline', title: 'Underline (Ctrl+U)', style: { textDecoration: 'underline' } },
      { icon: 'S', command: 'strikeThrough', title: 'Strikethrough', style: { textDecoration: 'line-through' } },
      { icon: 'Tₜ', command: 'subscript', title: 'Subscript' },
      { icon: 'Tᵗ', command: 'superscript', title: 'Superscript' },
      { icon: 'A', command: 'removeFormat', title: 'Clear Formatting', style: { fontSize: '10px' } },
    ],
  },
  {
    title: 'Headings',
    buttons: [
      { icon: 'H1', command: 'formatBlock', title: 'Heading 1', value: 'h1' },
      { icon: 'H2', command: 'formatBlock', title: 'Heading 2', value: 'h2' },
      { icon: 'H3', command: 'formatBlock', title: 'Heading 3', value: 'h3' },
      { icon: 'H4', command: 'formatBlock', title: 'Heading 4', value: 'h4' },
      { icon: 'P', command: 'formatBlock', title: 'Paragraph', value: 'p' },
    ],
  },
  {
    title: 'Alignment & Spacing',
    buttons: [
      { icon: '⬅', command: 'justifyLeft', title: 'Align Left' },
      { icon: '⬜', command: 'justifyCenter', title: 'Center' },
      { icon: '➡', command: 'justifyRight', title: 'Align Right' },
      { icon: '⬛', command: 'justifyFull', title: 'Justify' },
      { icon: '↶', command: 'outdent', title: 'Outdent' },
      { icon: '↧', command: 'indent', title: 'Indent' },
    ],
  },
  {
    title: 'Lists',
    buttons: [
      { icon: '•', command: 'insertUnorderedList', title: 'Bullet List' },
      { icon: '1.', command: 'insertOrderedList', title: 'Numbered List' },
      { icon: '☑', command: 'insertCheckbox', title: 'Checkbox List' },
    ],
  },
  {
    title: 'Insert',
    buttons: [
      { icon: '🔗', command: 'createLink', title: 'Insert Link' },
      { icon: '─', command: 'insertHorizontalRule', title: 'Horizontal Line' },
      { icon: '"', command: 'formatBlock', title: 'Blockquote', value: 'blockquote' },
      { icon: '<>', command: 'formatBlock', title: 'Code Block', value: 'pre' },
      { icon: '📷', command: 'insertImage', title: 'Insert Image' },
      { icon: '😊', command: 'emoji', title: 'Insert Emoji' },
    ],
  },
];

const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'];
const fontFamilies = [
  { label: 'Default', value: 'inherit' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
];

const colors = [
  '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
  '#ff0000', '#ff6600', '#ffcc00', '#00ff00', '#00ffff', '#0066ff',
  '#0000ff', '#6600ff', '#ff00ff', '#ff0066',
];

export default function RichTextEditor({ 
  value, 
  onChange,
  placeholder = 'Start writing your article...',
}: { 
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const [showFontFamily, setShowFontFamily] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  const emojis = ['😀', '😂', '😍', '🥰', '😎', '🤔', '😮', '😢', '😭', '😡', '🤯', '🥳', '😴', '🤓', '👀', '👏', '🙌', '🔥', '⭐', '💯', '✅', '❌', '⚠️', '💡', '🎉', '🎊', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💔'];

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
    updateCounts();
  }, [value]);

  const updateCounts = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCount(words.length);
      setCharCount(text.length);
    }
  }, []);

  const execCommand = (command: string, cmdValue?: string) => {
    switch (command) {
      case 'createLink': {
        const url = prompt('Enter URL:');
        if (url) document.execCommand('createLink', false, url);
        break;
      }
      case 'insertImage': {
        const url = prompt('Enter image URL:');
        if (url) document.execCommand('insertImage', false, url);
        break;
      }
      case 'emoji':
        setShowEmoji(!showEmoji);
        break;
      case 'insertCheckbox':
        document.execCommand('insertUnorderedList', false);
        break;
      case 'formatBlock':
      case 'fontName':
      case 'foreColor':
      case 'hiliteColor':
      case 'fontSize':
        if (cmdValue) document.execCommand(command, false, cmdValue);
        break;
      default:
        document.execCommand(command, false);
    }
    handleInput();
  };

  const insertEmoji = (emoji: string) => {
    document.execCommand('insertText', false, emoji);
    setShowEmoji(false);
    handleInput();
  };

  const applyColor = (color: string, isBackground: boolean = false) => {
    document.execCommand(isBackground ? 'hiliteColor' : 'foreColor', false, color);
    setShowColorPicker(false);
    setShowBgColorPicker(false);
    handleInput();
  };

  const applyFontSize = (size: string) => {
    const sizeMap: Record<string, string> = {
      '12px': '1', '14px': '2', '16px': '3', '18px': '4', '20px': '5',
      '24px': '6', '28px': '7', '32px': '7', '36px': '7', '48px': '7'
    };
    document.execCommand('fontSize', false, sizeMap[size] || '4');
    setShowFontSize(false);
    handleInput();
  };

  const applyFontFamily = (family: string) => {
    document.execCommand('fontName', false, family);
    setShowFontFamily(false);
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateCounts();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); execCommand('bold'); break;
        case 'i': e.preventDefault(); execCommand('italic'); break;
        case 'u': e.preventDefault(); execCommand('underline'); break;
      }
    }
  };

  const renderButton = (btn: EditorButton, extraClass: string = '') => (
    <button
      key={btn.title}
      type="button"
      title={btn.title}
      onClick={() => execCommand(btn.command, btn.value)}
      className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors ${extraClass}`}
      style={btn.style}
    >
      {btn.icon}
    </button>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className={`border-b border-gray-200 bg-gray-50 ${isFocused ? 'bg-primary-50' : ''}`}>
        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-gray-200">
          {formattingGroups[0].buttons.map((btn) => renderButton(btn, 'text-sm font-bold min-w-[32px]'))}
        </div>

        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-gray-200">
          {formattingGroups[1].buttons.map((btn) => renderButton(btn, 'text-xs font-bold min-w-[36px]'))}
          <div className="w-px h-6 bg-gray-300 mx-1" />
          {formattingGroups[2].buttons.map((btn) => renderButton(btn))}
        </div>

        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5">
          {formattingGroups[3].buttons.map((btn) => renderButton(btn))}
          <div className="w-px h-6 bg-gray-300 mx-1" />
          {formattingGroups[4].buttons.map((btn) => renderButton(btn))}
          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="relative">
            <button
              type="button"
              title="Font Size"
              onClick={() => {
                setShowFontSize(!showFontSize);
                setShowFontFamily(false);
                setShowColorPicker(false);
                setShowBgColorPicker(false);
              }}
              className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 transition-colors text-xs font-medium min-w-[50px]"
            >
              Size ▾
            </button>
            {showFontSize && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 max-h-48 overflow-y-auto w-24">
                {fontSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => applyFontSize(size)}
                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 transition-colors"
                    style={{ fontSize: size }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              title="Font Family"
              onClick={() => {
                setShowFontFamily(!showFontFamily);
                setShowFontSize(false);
                setShowColorPicker(false);
                setShowBgColorPicker(false);
              }}
              className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 transition-colors text-xs font-medium min-w-[70px]"
            >
              Font ▾
            </button>
            {showFontFamily && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 max-h-48 overflow-y-auto w-36">
                {fontFamilies.map((font) => (
                  <button
                    key={font.value}
                    type="button"
                    onClick={() => applyFontFamily(font.value)}
                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 transition-colors"
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              title="Text Color"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowBgColorPicker(false);
                setShowFontSize(false);
                setShowFontFamily(false);
              }}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <span className="w-5 h-5 rounded border border-gray-300" style={{ background: 'linear-gradient(to bottom, #fff 50%, #000 50%)' }} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                <p className="text-xs text-gray-500 mb-2">Text Color</p>
                <div className="grid grid-cols-8 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => applyColor(color)}
                      className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              title="Highlight Color"
              onClick={() => {
                setShowBgColorPicker(!showBgColorPicker);
                setShowColorPicker(false);
                setShowFontSize(false);
                setShowFontFamily(false);
              }}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <span className="w-5 h-5 rounded border border-gray-300 bg-gradient-to-br from-yellow-200 to-yellow-400" />
            </button>
            {showBgColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                <p className="text-xs text-gray-500 mb-2">Highlight</p>
                <div className="grid grid-cols-8 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => applyColor(color, true)}
                      className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />
          {renderButton({ icon: '↶', command: 'undo', title: 'Undo (Ctrl+Z)' })}
          {renderButton({ icon: '↷', command: 'redo', title: 'Redo (Ctrl+Y)' })}

          <div className="ml-auto">
            <button
              type="button"
              title="Preview Mode"
              onClick={() => setIsPreview(!isPreview)}
              className={`px-3 h-8 flex items-center justify-center rounded transition-colors text-xs font-medium ${
                isPreview ? 'bg-primary-600 text-white' : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isPreview ? '✎ Edit' : '👁 Preview'}
            </button>
          </div>
        </div>

        {showEmoji && (
          <div className="px-2 py-2 border-t border-gray-200 bg-white">
            <div className="grid grid-cols-9 gap-1">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {(showColorPicker || showBgColorPicker || showFontSize || showFontFamily || showEmoji) && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => {
              setShowColorPicker(false);
              setShowBgColorPicker(false);
              setShowFontSize(false);
              setShowFontFamily(false);
              setShowEmoji(false);
            }}
          />
        )}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        className={`prose max-w-none p-4 min-h-[400px] outline-none overflow-auto ${
          isFocused ? 'ring-2 ring-primary-500 ring-inset' : ''
        } ${isPreview ? 'bg-gray-50 pointer-events-none' : ''}`}
        style={{ lineHeight: '1.75' }}
      />

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="px-2 py-0.5 bg-gray-200 rounded text-[10px]">Ctrl+B</span> Bold
          <span className="px-2 py-0.5 bg-gray-200 rounded text-[10px]">Ctrl+I</span> Italic
          <span className="px-2 py-0.5 bg-gray-200 rounded text-[10px]">Ctrl+U</span> Underline
        </div>
      </div>

      <style jsx global>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
        }
        [contenteditable] h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
        [contenteditable] h2 { font-size: 1.5em; font-weight: bold; margin: 0.83em 0; }
        [contenteditable] h3 { font-size: 1.17em; font-weight: bold; margin: 1em 0; }
        [contenteditable] h4 { font-size: 1em; font-weight: bold; margin: 1.33em 0; }
        [contenteditable] p { margin: 1em 0; }
        [contenteditable] ul, [contenteditable] ol { padding-left: 2em; margin: 1em 0; }
        [contenteditable] li { margin: 0.5em 0; }
        [contenteditable] blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
          font-style: italic;
          background: #f9fafb;
          padding: 1em;
          border-radius: 0 8px 8px 0;
        }
        [contenteditable] a { color: #2563eb; text-decoration: underline; }
        [contenteditable] hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.5em 0; }
        [contenteditable] pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1em;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          overflow-x: auto;
        }
        [contenteditable] img { max-width: 100%; height: auto; border-radius: 8px; margin: 1em 0; }
        [contenteditable] sub { vertical-align: sub; font-size: 0.75em; }
        [contenteditable] sup { vertical-align: super; font-size: 0.75em; }
      `}</style>
    </div>
  );
}
