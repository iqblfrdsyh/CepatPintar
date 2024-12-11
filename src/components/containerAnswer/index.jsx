import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ value }) => (
  <SyntaxHighlighter
    language="javascript"
    style={atomOneDark}
    wrapLongLines={true}
    customStyle={{ padding: "25px" }}
    className="rounded-sm"
  >
    {value}
  </SyntaxHighlighter>
);

const TextWithCode = ({ text }) => {
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const boldTextRegex = /\*\*([^*]+)\*\*/g;
  const inlineCodeRegex = /`([^`]+)`/g;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const formatInlineCodeAndBold = (text) => {
    const formattedText = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const beforeMatch = text.substring(lastIndex, match.index);
      if (beforeMatch) formattedText.push(beforeMatch);

      if (match[1] && match[2]) {
        formattedText.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400"
          >
            {match[1]}
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    const remainingText = text.substring(lastIndex);
    formattedText.push(remainingText);

    return formattedText.map((part, index) => {
      if (typeof part === "string") {
        const boldFormatted = [];
        let lastBoldIndex = 0;
        let boldMatch;

        while ((boldMatch = boldTextRegex.exec(part)) !== null) {
          const beforeBoldMatch = part.substring(lastBoldIndex, boldMatch.index);
          if (beforeBoldMatch) boldFormatted.push(beforeBoldMatch);

          if (boldMatch[1]) {
            boldFormatted.push(
              <span key={`bold-${boldMatch.index}`} style={{ fontWeight: "bold" }}>
                {boldMatch[1]}
              </span>
            );
          }

          lastBoldIndex = boldTextRegex.lastIndex;
        }

        const remainingBoldText = part.substring(lastBoldIndex);
        boldFormatted.push(remainingBoldText);

        return boldFormatted.map((boldPart, boldIndex) => {
          if (typeof boldPart === "string") {
            const parts = boldPart.split(inlineCodeRegex).map((subPart, subIndex) => {
              if (subIndex % 2 === 1) {
                return <code key={`inline-${index}-${subIndex}`}>{subPart}</code>;
              }
              return subPart;
            });

            return (
              <React.Fragment key={`${index}-${boldIndex}`}>
                {parts}
              </React.Fragment>
            );
          }
          return boldPart;
        });
      }
      return part;
    });
  };

  const formatText = (text) => {
    const replacedText = text.replace(/^\* /gm, "- ").replace(/\*{4}$/gm, "**");
    return replacedText.split("\n").map((paragraph, index) => {
      if (paragraph.trim().startsWith("```")) {
        return <CodeBlock key={index} value={paragraph} />;
      }
      return (
        <p key={index} className="my-3">
          {formatInlineCodeAndBold(paragraph)}
        </p>
      );
    });
  };

  return (
    <div>
      {text.split(codeBlockRegex).map((part, index) => {
        if (index % 2 === 0) {
          return <div key={`part-${index}`}>{formatText(part)}</div>;
        }
        return <CodeBlock key={`code-${index}`} value={part} />;
      })}
    </div>
  );
};

const ContainerAnswer = ({ text }) => (
  <div className="h-[80%] mx-auto pb-4">
    <TextWithCode text={text} />
  </div>
);

export default ContainerAnswer;
