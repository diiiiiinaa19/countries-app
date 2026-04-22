import type { Country } from '../../types/country';
import styles from './CountryDetail.module.scss';

interface Props {
  country: Country | null;
  onClose: () => void;
}

function formatPopulation(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function CountryDetail({ country, onClose }: Props) {
  if (!country) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M20 32 Q32 20 44 32 Q32 44 20 32Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <p className={styles.emptyText}>Select a country</p>
        <p className={styles.emptyHint}>Click on any card to explore details</p>
      </div>
    );
  }

  return (
    <div className={styles.detail} key={country.cca3}>
      <button className={styles.close} onClick={onClose} aria-label="Close details">
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className={styles.flagWrap}>
        <img
          className={styles.flag}
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt ?? `Flag of ${country.name.common}`}
        />
      </div>

      <div className={styles.body}>
        <h2 className={styles.name}>{country.name.common}</h2>
        <p className={styles.official}>{country.name.official}</p>

        <div className={styles.divider} />

        <dl className={styles.meta}>
          <div className={styles.row}>
            <dt>Capital</dt>
            <dd>{country.capital?.[0] ?? '—'}</dd>
          </div>
          <div className={styles.row}>
            <dt>Region</dt>
            <dd>
              <span className={styles.badge}>{country.region}</span>
            </dd>
          </div>
          <div className={styles.row}>
            <dt>Population</dt>
            <dd>{formatPopulation(country.population)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
