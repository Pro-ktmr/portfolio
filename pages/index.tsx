import {
  Post,
  getAllPosts,
  getAllCategories,
  getAllTags,
} from '../lib/posts'
import Link from 'next/link'
import { useState, ChangeEvent } from 'react'
import { parseAsDate } from '../lib/time'

export async function getStaticProps() {
  const posts = await getAllPosts()
  const allCategories = getAllCategories()
  const allTags = await getAllTags()
  return {
    props: {
      posts,
      allCategories,
      allTags,
    },
  }
}

export default ({
  posts,
  allCategories,
  allTags,
}: {
  posts: Post[]
  allCategories: string[]
  allTags: string[]
}) => {
  const [freeWords, setFreeWords] = useState('')
  const [orderKey, setOrderKey] = useState('stars')
  const [categories, setCategories] = useState(allCategories)
  const [tags, setTags] = useState(allTags)
  const [duration, setDuration] = useState('2000-01-01 3000-01-01')

  function changeFreeWords(e: ChangeEvent<HTMLInputElement>) {
    setFreeWords(e.target.value)
  }

  function changeOrderKey(e: ChangeEvent<HTMLSelectElement>) {
    setOrderKey(e.target.value)
  }

  function changeCategories(e: ChangeEvent<HTMLInputElement>) {
    let tmpCategories = categories.map((item) => item)
    if (e.target.checked) tmpCategories.push(e.target.value)
    else
      tmpCategories = tmpCategories.filter(
        (item) => item != e.target.value
      )
    setCategories(tmpCategories)
  }

  function changeTags(e: ChangeEvent<HTMLInputElement>) {
    let tmpTags = tags.map((item) => item)
    if (e.target.checked) tmpTags.push(e.target.value)
    else tmpTags = tmpTags.filter((item) => item != e.target.value)
    setTags(tmpTags)
  }

  function changeDuration(e: ChangeEvent<HTMLSelectElement>) {
    setDuration(e.target.value)
  }

  const searchedPosts = posts.filter((post) => {
    let res = true

    // フリーワード
    const re = /[\s　] + /
    const freeWordArray = freeWords.split(re)
    for (const freeWord of freeWordArray) {
      if (freeWord == '') continue
      res &&=
        post.title.includes(freeWord) ||
        post.category.includes(freeWord) ||
        post.tags.join(' ').includes(freeWord) ||
        post.contentHtml.includes(freeWord)
    }

    // カテゴリ
    res &&= categories.includes(post.category)

    // タグ
    res &&= post.tags.map((tag) => tags.includes(tag)).includes(true)

    // 期間
    const searched_beginning_time = parseAsDate(
      duration.split(' ')[0]
    )
    const searched_ending_time = parseAsDate(duration.split(' ')[1])
    res &&=
      searched_beginning_time <= parseAsDate(post.ending_time) &&
      parseAsDate(post.beginning_time) <= searched_ending_time

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
            <div className='colLeft'>
              <label htmlFor='inputFreeWords'>フリーワード</label>
            </div>
            <div className='colRight'>
              <input
                id='inputFreeWords'
                onChange={(e) => changeFreeWords(e)}
              ></input>
            </div>
          </div>
          <div className='row'>
            <div className='colLeft'>カテゴリ</div>
            <div className='colRight'>
              {allCategories.map((category) => {
                return (
                  <div key={category}>
                    <input
                      type='checkbox'
                      id={`inputCategory_${category}`}
                      value={category}
                      onChange={(e) => changeCategories(e)}
                      defaultChecked={true}
                    />
                    <label htmlFor={`inputCategory_${category}`}>
                      {category}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='row'>
            <div className='colLeft'>タグ</div>
            <div className='colRight'>
              {allTags.map((tag) => {
                return (
                  <div key={tag}>
                    <input
                      type='checkbox'
                      id={`inputTag_${tag}`}
                      value={tag}
                      onChange={(e) => changeTags(e)}
                      defaultChecked={true}
                    />
                    <label htmlFor={`inputTag_${tag}`}>{tag}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='row'>
            <div className='colLeft'>期間</div>
            <div className='colRight'>
              <select
                id='selectDuration'
                defaultValue='2000-01-01 3000-01-01'
                onChange={(e) => changeDuration(e)}
              >
                <option value='2000-01-01 3000-01-01'>すべて</option>
                <option value='2017-04-01 2020-03-31'>
                  高校時代 (2017 年 4 月 ～ 2020 年 3 月)
                </option>
                <option value='2020-04-01 2023-03-31'>
                  大学時代 (2020 年 4 月 ～)
                </option>
              </select>
            </div>
          </div>
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
          <Link href={`/posts/${post.postId}`} key={post.postId}>
            <a>
              <div>
                <h3>{post.title}</h3>
                <div>{post.stars}</div>
                <div>
                  {post.beginning_time} ～ {post.ending_time}
                </div>
                <div>{post.description}</div>
                <div>{post.category}</div>
                <div>{post.tags.join(', ')}</div>
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
