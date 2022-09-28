import { Post, getAllPostIds, getPost } from '../../lib/posts'
import Head from 'next/head'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.postId)
  return {
    props: {
      post,
    },
  }
}

export default ({ post }: { post: Post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1>{post.title}</h1>
        <ul>
          <li>
            期間：{post.beginning_time} ～ {post.ending_time}
          </li>
          <li>カテゴリ：{post.category}</li>
          <li>タグ：{post.tags.join(', ')}</li>
        </ul>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        <ul>
          <li>記事作成日：{post.created_at}</li>
          <li>最終更新日：{post.updated_at}</li>
        </ul>
      </article>
    </>
  )
}
