import styles from './Home.module.css';
export const Home = () => (
    <div className={styles.actionsContainer}>
      <button className={styles.action}>Add a Payment</button>
      <button className={styles.action}>Add a Lien</button>
      <button className={styles.action}>Add a Closing</button>
      <button className={styles.action}>Add a Newsletter</button>
    </div>
)