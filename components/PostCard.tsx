import { Post } from '../lib/posts'
import { useRouter } from 'next/router'
import { renderDuration } from '../lib/time'
import Link from 'next/link'
import styles from './PostCard.module.css'
import { Fragment } from 'react'

export default ({
  post,
  query,
}: {
  post: Post
  query: any
}): JSX.Element => {
  const router = useRouter()

  return (
    <Link
      href={{ pathname: `/posts/${post.postId}`, query: query }}
      key={post.postId}
    >
      <a className={styles.outer}>
        <div className={styles.card}>
          <div className={styles.eye_catch}>
            <div className={styles.altCategory}>{post.category}</div>
            {post.eye_catch !== null ? (
              <img
                className={styles.image}
                src={post.eye_catch}
                alt={post.description}
                onError={(e) => {
                  ;(e.target as HTMLElement).style.display = 'none'
                }}
              ></img>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>{post.title}</h3>
            <div>
              <Stars stars={post.stars} />
            </div>
            <div className={styles.description}>
              {post.description}
            </div>
            <div className={styles.information}>
              <CategoryAndTags
                category={post.category}
                tags={post.tags}
              />
              <div className={styles.duration}>
                {renderDuration(
                  post.beginning_time,
                  post.ending_time
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export function Stars({ stars }: { stars: number }): JSX.Element {
  const yellowStars = new Array<string>(stars).fill('')
  const grayStars = new Array<string>(5 - stars).fill('')

  return (
    <span className={styles.stars}>
      {yellowStars.map((_, i) => (
        <span
          className={`${styles.star} ${styles.yellow}`}
          key={i}
        ></span>
      ))}
      {grayStars.map((_, i) => (
        <span
          className={`${styles.star} ${styles.gray}`}
          key={i}
        ></span>
      ))}
    </span>
  )
}

export function CategoryAndTags({
  category,
  tags,
}: {
  category: string
  tags: string[]
}): JSX.Element {
  return (
    <>
      <span className={`${styles.badge} ${styles.category}`}>
        {category}
      </span>{' '}
      {tags.sort().map((tag) => {
        return (
          <>
            <span
              className={`${styles.badge} ${styles.tag}`}
              key={tag}
            >
              {tag}
            </span>{' '}
          </>
        )
      })}
    </>
  )
}

export function CategoryAndTagsAnchor({
  category,
  tags,
}: {
  category: string
  tags: string[]
}): JSX.Element {
  return (
    <>
      <Link
        href={{
          pathname: `/`,
          query: { categories: category },
        }}
      >
        <a className={`${styles.badge} ${styles.category}`}>
          {category}
        </a>
      </Link>
      {tags.sort().map((tag) => {
        return (
          <Fragment key={tag}>
            <Link
              href={{
                pathname: `/`,
                query: { tags: tag },
              }}
              key={tag}
            >
              <a className={`${styles.badge} ${styles.tag}`}>{tag}</a>
            </Link>{' '}
          </Fragment>
        )
      })}
    </>
  )
}
