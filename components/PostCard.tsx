import { Post } from '../lib/posts'
import { renderDuration } from '../lib/time'
import Link from 'next/link'
import styles from './PostCard.module.css'

export default ({ post }: { post: Post }): JSX.Element => {
  return (
    <Link href={`/posts/${post.postId}`} key={post.postId}>
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
              <span className={`${styles.badge} ${styles.category}`}>
                {post.category}
              </span>
              {post.tags.map((tag) => {
                return (
                  <span
                    className={`${styles.badge} ${styles.tag}`}
                    key={tag}
                  >
                    {tag}
                  </span>
                )
              })}
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

function Stars({ stars }: { stars: number }): JSX.Element {
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