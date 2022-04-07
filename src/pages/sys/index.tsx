import { Layout } from '@/layouts/default'
import { getSortedPostsData } from '@/lib/posts';

import { GetStaticProps, InferGetStaticPropsType } from 'next';

// 静态生成（预渲染）：（从页面导出）
export const getStaticProps: GetStaticProps = async function () {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
};

export default function Sys({ allPostsData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>Dashboard</div>
  )
}

Sys.layout = Layout;
