/**
 *
 * @author anguer
 * @date Create by 2022-04-02
 */
import { Layout } from '@/layouts/default';
import { getAllPostIds, getPostData } from '@/lib/posts';
import Head from 'next/head'
import Date from '@/components/date';
import utilStyles from '@/styles/utils.module.css'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement } from 'react';

export default function Post({ postData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  )
};

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async function () {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
