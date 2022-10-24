import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Ga from '../../components/ga'
import { Post, getAllPostIds, getPost } from '../../lib/posts'
import { renderDuration, renderTime } from '../../lib/time'
import styles from '../../styles/post.module.css'
import {
  Stars,
  CategoryAndTagsAnchor,
} from '../../components/PostCard'
import path from 'path'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postId = params.postId
  const post = await getPost(postId)
  return {
    props: {
      postId,
      post,
    },
  }
}

export default ({ postId, post }: { postId: string; post: Post }) => {
  const router = useRouter()
  const query = router.query

  return (
    <div>
      <Head>
        <title>{post.title}｜サーチできるポートフォリオ「幸」</title>
        <meta name='description' content={post.description} />
        <link rel='icon' href='../images/favicon.ico'></link>
        <meta
          property='og:url'
          content={path.join(process.env.deployURL, 'posts', postId)}
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={post.title + '｜サーチできるポートフォリオ「幸」'}
        />
        <meta property='og:description' content={post.description} />
        <meta
          property='og:site_name'
          content='サーチできるポートフォリオ「幸」'
        />
        {post.eye_catch ? (
          <meta property='og:image' content={post.eye_catch} />
        ) : (
          <></>
        )}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@Pro_ktmr' />
        <meta name='twitter:creator' content='@Pro_ktmr' />
      </Head>
      <Ga />
      <div className={styles.topNav}>
        <Link href='/'>
          <a>
            サーチできるポートフォリオ「幸」
            <span className={styles.name}>― 北村 祐稀</span>
          </a>
        </Link>
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
            <CategoryAndTagsAnchor
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
