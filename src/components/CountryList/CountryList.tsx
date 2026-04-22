import type { Country } from '../../types/country';
import { CountryCard } from '../CountryCard/CountryCard';
import styles from './CountryList.module.scss';

interface Props {
  countries: Country[];
  selected: Country | null;
  onSelect: (c: Country) => void;
  loading: boolean;
  error: string | null;
}

export function CountryList({ countries, selected, onSelect, loading, error }: Props) {
  if (loading) {
    return (
      <div className={styles.state}>
        <div className={styles.spinner} aria-label="Loading countries" />
        <p>Loading countries…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <span className={styles.errorIcon}>⚠</span>
        <p>{error}</p>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className={styles.state}>
        <span className={styles.emptyIcon}>🌍</span>
        <p>No countries found</p>
        <span className={styles.hint}>Try a different search or region</span>
      </div>
    );
  }

  return (
    <div className={styles.list} role="list">
      {countries.map((c) => (
        <div key={c.cca3} role="listitem">
          <CountryCard
            country={c}
            isSelected={selected?.cca3 === c.cca3}
            onClick={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
