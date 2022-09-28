import { Post, getAllPosts } from '../lib/posts'
import Link from 'next/link'
import { useState, ChangeEvent } from 'react'

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts,
    },
  }
}

export default ({ posts }: { posts: Post[] }) => {
  const [freeWords, setFreeWords] = useState('')

  function changeFreeWords(e: ChangeEvent<HTMLInputElement>) {
    setFreeWords(e.target.value)
  }

  const referdPosts = posts.filter((post) => {
    let res = true

    // フリーワード
    const re = /[\s　] + /
    const freeWordArray = freeWords.split(re)
    for (const freeWord of freeWordArray) {
      if (freeWord == '') continue
      res &&=
        post.title.indexOf(freeWord) != -1 ||
        post.category.indexOf(freeWord) != -1 ||
        post.tags.join(' ').indexOf(freeWord) != -1 ||
        post.contentHtml.indexOf(freeWord) != -1
    }

    return res
  })

  return (
    <div>
      <Top />

      <div>
        <div>
          <div className='row'>
            <div className='col'>
              <label htmlFor='inputFreeWords'>フリーワード</label>
            </div>
            <div className='col'>
              <input
                id='inputFreeWords'
                onChange={(e) => changeFreeWords(e)}
              ></input>
            </div>
          </div>
        </div>
        <ul>
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
      <div>
        <PostsHtml posts={referdPosts} />
      </div>
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

function PostsHtml({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post) => {
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
      })}
    </>
  )
}
