import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown-light.css';

async function getChangelog() {
  const fullPath = path.join(process.cwd(), 'CHANGELOG.md');
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  return {
    content,
    ...data,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getChangelog();

  return {
    props: {
      data,
    },
  };
};

export default function Changelog({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <article className="markdown-body">
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </article>
  );
}
