/**
 * Reading View Functions
 * - Append <html>, <head>, and <body> tags to incoming string (internal html, direct child of <body>)
 * - Insert style rules to <head> tag
 */

import { style } from "../../data/reader/css/resume";

const appendOpeningTag = (tag: string, content: string) => {
  return `<${tag}>\n${content}`;
};

const appendClosingTag = (tag: string, content: string) => {
  return `${content}\n</${tag}>`;
};

export const splitLines = (content: string) => {
  return content.split("\n");
};

export const insertAtLine = (
  lineNumber: number,
  insertion: string[],
  content: string[],
): string[] => {
  if (content.length == 0) return insertion;
  if (lineNumber > content.length + 1) return [...content, ...insertion];
  if (lineNumber < 0) return [...insertion, ...content];
  const newLines = [
    ...content.slice(0, lineNumber),
    ...insertion,
    ...content.slice(lineNumber),
  ];
  return newLines;
};

const addBodyTags = (content: string[]): string[] => {
  return [`<body>`, ...content, `</body>`];
};

const addHeadTags = (content: string[]): string[] => {
  return insertAtLine(-1, [`<head>`, "", `</head>`], content);
};

const hasTags = (content: string[], tag: string): boolean => {
  let openerExists = false;
  let closerExists = false;
  for (const line of content) {
    if (line === `<${tag}>`) openerExists = true;
    if (line === `</${tag}>`) closerExists = true;
    if (openerExists && closerExists) return true;
  }
  return false;
};

export const addHtmlTags = (content: string[]): string[] => {
  return [`<html>`, ...content, `</html>`];
};

export const addCSSToBasicHTML = (content: string[]): string[] => {
  const withBody = addBodyTags(content);
  const withHead = addHeadTags(withBody);
  const withCss = insertAtLine(2, style, withHead);
  const wrapped = addHtmlTags(withCss);
  return wrapped;
};

export const addCss = (content: string): string => {
  const lines = splitLines(content);
  const wrapped = addCSSToBasicHTML(lines).join("\n");
  return wrapped;
};
