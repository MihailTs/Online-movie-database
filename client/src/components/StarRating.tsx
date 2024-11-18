import styles from '../styles/component/StarRating.module.css';

interface StarRatingProps {
  rating: number;
}

export function StarRating ({ rating }: StarRatingProps) {
  const totalStars = 10;
  const filledStars = Math.round((rating / 10) * totalStars);

  return (
    <div className={styles.starRating}>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={index < filledStars ? styles.filled : styles.empty}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;