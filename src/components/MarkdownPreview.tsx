import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Note } from '../types/note';

type MarkdownPreviewProps = {
  note: Note | null;
};

export const MarkdownPreview = ({ note }: MarkdownPreviewProps) => {
  if (!note) {
    return (
      <section className="flex min-h-[420px] min-w-0 flex-1 items-center justify-center bg-panel text-sm text-zinc-500">
        预览内容为空
      </section>
    );
  }

  return (
    <section className="min-h-[520px] min-w-0 flex-1 overflow-y-auto bg-panel px-5 py-6 sm:px-8 sm:py-8 xl:min-h-0 xl:px-10 xl:py-10">
      {note.content.trim() ? (
        <div className="prose prose-invert max-w-none font-mono prose-headings:text-glow prose-a:text-glow prose-strong:text-zinc-100 prose-code:text-glow prose-pre:bg-transparent">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className ?? '');

                if (match) {
                  return (
                    <SyntaxHighlighter
                      PreTag="div"
                      language={match[1]}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: '1.25rem 0',
                        borderRadius: '0',
                        border: '1px solid #2a2f2c',
                        background: '#111312',
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  );
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {note.content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-zinc-500">
          预览内容为空
        </div>
      )}
    </section>
  );
};
