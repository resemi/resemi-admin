import ReactMarkdown from 'react-markdown';
import { FunctionComponent, ReactNode } from 'react';
import styles from './markdown.module.scss';

export type MarkdownProps = {
  children?: ReactNode;
};

export const Markdown: FunctionComponent<MarkdownProps> = ({ children }) => {
  return (
    <article className={styles.markdown}>
      <ReactMarkdown>{children as string}</ReactMarkdown>
    </article>
  );
};
