import Head from 'next/head'
import Link from 'next/link'
import { Post, getAllPostIds, getPost } from '../../lib/posts'
import { renderDuration, renderTime } from '../../lib/time'
import styles from '../../components/post.module.css'
import { Stars, CategoryAndTags } from '../../components/PostCard'

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
    <div>
      <Head>
        <title>{post.title}｜サーチできるポートフォリオ「幸」</title>
      </Head>
      <div className={styles.topNav}>
        <Link href='/'>サーチできるポートフォリオ「幸」</Link>
      </div>
      <div className={styles.backNav}>
        <Link href='/'>← 検索画面に戻る</Link>
      </div>
      <article className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.status}>
          <div>
            <Stars stars={post.stars} />
            <div className={styles.duration}>
              {renderDuration(post.beginning_time, post.ending_time)}
            </div>
          </div>
          <div className={styles.badges}>
            <CategoryAndTags
              category={post.category}
              tags={post.tags}
            />
          </div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <div className={styles.postInfo}>
          <div className={styles.row}>
            <div className={styles.colLeft}>記事作成日</div>
            <div className={styles.colRight}>
              {renderTime(post.created_at)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.colLeft}>最終更新日</div>
            <div className={styles.colRight}>
              {renderTime(post.updated_at)}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
