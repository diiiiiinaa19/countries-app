import type { Country } from '../../types/country';
import styles from './CountryCard.module.scss';

interface Props {
  country: Country;
  isSelected: boolean;
  onClick: (c: Country) => void;
}

export function CountryCard({ country, isSelected, onClick }: Props) {
  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={() => onClick(country)}
      aria-pressed={isSelected}
      aria-label={`View details for ${country.name.common}`}
    >
      <div className={styles.flag}>
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt ?? `Flag of ${country.name.common}`}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{country.name.common}</span>
        <span className={styles.region}>{country.region}</span>
      </div>
      {isSelected && <div className={styles.indicator} aria-hidden="true" />}
    </button>
  );
}
