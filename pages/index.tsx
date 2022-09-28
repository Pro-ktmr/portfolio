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
  const [orderKey, setOrderKey] = useState('stars')

  function changeFreeWords(e: ChangeEvent<HTMLInputElement>) {
    setFreeWords(e.target.value)
  }

  function changeOrderKey(e: ChangeEvent<HTMLSelectElement>) {
    setOrderKey(e.target.value)
  }

  const searchedPosts = posts.filter((post) => {
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

  const sortedPost = searchedPosts.sort((l, r) => {
    if (orderKey === 'stars') {
      if (l.stars > r.stars) return -1
      if (l.stars < r.stars) return 1
      if (Date.parse(l.beginning_time) > Date.parse(r.beginning_time))
        return -1
      if (Date.parse(l.beginning_time) < Date.parse(r.beginning_time))
        return 1
      return 0
    }
    if (orderKey === 'new') {
      if (Date.parse(l.beginning_time) > Date.parse(r.beginning_time))
        return -1
      if (Date.parse(l.beginning_time) < Date.parse(r.beginning_time))
        return 1
      if (l.stars > r.stars) return -1
      if (l.stars < r.stars) return 1
      return 0
    }
    if (orderKey === 'old') {
      if (Date.parse(l.beginning_time) > Date.parse(r.beginning_time))
        return 1
      if (Date.parse(l.beginning_time) < Date.parse(r.beginning_time))
        return -1
      if (l.stars > r.stars) return -1
      if (l.stars < r.stars) return 1
      return 0
    }
    return 0
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
          <ul>
            <li>カテゴリ</li>
            <li>タグ</li>
            <li>期間</li>
          </ul>
        </div>
        <div>
          <select
            id='selectOrderKey'
            defaultValue='star'
            onChange={(e) => changeOrderKey(e)}
          >
            <option value='stars'>おすすめな方から</option>
            <option value='new'>新しい方から</option>
            <option value='old'>古い方から</option>
          </select>
        </div>
      </div>
      <PostsHtml posts={sortedPost} />
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
    <div>
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
    </div>
  )
}
