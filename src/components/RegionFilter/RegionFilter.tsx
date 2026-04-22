import type { Region } from '../../types/country';
import styles from './RegionFilter.module.scss';

const REGIONS: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

interface Props {
  value: Region;
  onChange: (r: Region) => void;
}

export function RegionFilter({ value, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M6 10h8M9 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as Region)}
        aria-label="Filter by region"
      >
        <option value="">All Regions</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <svg className={styles.chevron} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
