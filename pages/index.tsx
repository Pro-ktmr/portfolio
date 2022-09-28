import { Post, getAllPosts } from '../lib/posts'
import Link from 'next/link'

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts,
    },
  }
}

export default ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      <Top />
      <SearchBox />
      <SearchResult posts={posts} />
    </div>
  )
}

function Top() {
  return (
    <div>
      <h1>
        サーチできるポートフォリオ「
        <ruby>
          幸<rt>さち</rt>
        </ruby>
        」
      </h1>
    </div>
  )
}

function SearchBox() {
  return (
    <div>
      <ul>
        <li>フリーワード</li>
        <li>カテゴリ</li>
        <li>タグ</li>
        <li>期間</li>
      </ul>
      <ul>
        <li>おすすめ度順</li>
        <li>新しい方から</li>
        <li>古い方から</li>
      </ul>
    </div>
  )
}

function SearchResult({ posts }: { posts: Post[] }) {
  return posts.map((post) => {
    return (
      <Link href={`/posts/${post.postId}`}>
        <div>
          <h3>{post.title}</h3>
          <div>{post.stars}</div>
          <div>
            {post.beginning_time} ～ {post.ending_time}
          </div>
          <div>{post.description}</div>
        </div>
      </Link>
    )
  })
}
