import styles from './Top.module.css'

export default () => {
  return (
    <div className={styles.top}>
      <h1>
        <span className={styles.nobreak}>サーチできる</span>
        <span className={styles.nobreak}>ポートフォリオ</span>
        <span className={styles.satch}>
          「
          <ruby data-ruby='さち'>
            幸<rt>さち</rt>
          </ruby>
          」
        </span>
      </h1>
      <div className={styles.name}>― 北村 祐稀 ―</div>
    </div>
  )
}
