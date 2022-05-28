import ReactMarkdown from 'react-markdown';
import { FunctionComponent } from 'react';
import styles from './markdown.module.scss';

export type MarkdownProps = {};

export const Markdown: FunctionComponent<MarkdownProps> = ({ children }) => {
  return (
    <article className={styles.markdown}>
      <ReactMarkdown>{children as string}</ReactMarkdown>
    </article>
  );
};
