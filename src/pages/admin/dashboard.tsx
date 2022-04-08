import { Layout } from '@/layouts/default'
import { getSortedPostsData } from '@/lib/posts';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import utilStyles from '@/styles/utils.module.css';
import Link from 'next/link';
import Date from '@/components/date';

// 静态生成（预渲染）：（从页面导出）
export const getStaticProps: GetStaticProps = async function () {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
};

export default function Dashboard({ allPostsData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}><a>{title}</a></Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
