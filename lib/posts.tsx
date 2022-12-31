import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  postId: string
  contentHtml: string
  title?: string
  description?: string
  stars?: number
  category?: string
  tags?: string[]
  beginning_time?: string
  ending_time?: string | null
  eye_catch?: string | null
  created_at?: string
  updated_at?: string
}

export function getAllCategories() {
  return [
    '学業',
    '研究',
    '職歴',
    '開発物',
    'コンテスト',
    '資格',
    '社会貢献活動',
    'イベント参加',
  ]
}

export async function getAllTags() {
  let res: string[] = []
  const posts = await getAllPosts()
  for (const post of posts) {
    res = res.concat(post.tags)
  }
  res = res.filter(
    (item, index, self) => self.indexOf(item) === index
  )
  res = res.sort()
  return res
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        postId: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPost(postId: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${postId}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(matterResult.content)
  const contentHtml: string = processedContent.toString()

  return {
    postId,
    contentHtml,
    ...matterResult.data,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const postIds = getAllPostIds()
  let posts: Post[] = []
  for (const postId of postIds) {
    posts.push(await getPost(postId.params.postId))
  }
  return posts
}

export async function getRelatedPosts(
  thisPostId: string
): Promise<Post[]> {
  const thisPost = await getPost(thisPostId)
  const postIds = getAllPostIds()
  let tuples: {
    score: number
    post: Post
  }[] = []
  for (const postId of postIds) {
    if (thisPostId === postId.params.postId) continue
    const post = await getPost(postId.params.postId)

    let score: number = 0
    if (thisPost.category === post.category) {
      score++
    }
    for (const tag of thisPost.tags) {
      if (post.tags.includes(tag)) {
        score++
      }
    }

    tuples.push({ score: score, post: post })
  }
  const posts: Post[] = tuples
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((tuple) => tuple.post)
  return posts
}
