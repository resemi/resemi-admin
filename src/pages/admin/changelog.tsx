import path from 'path';
import fs from 'fs';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Markdown } from '@/components/Markdown';

async function getChangelog() {
  const fullPath = path.join(process.cwd(), 'CHANGELOG.md');
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  return {
    content: fileContents,
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
  return <Markdown>{data.content}</Markdown>;
}
