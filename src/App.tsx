import { useCountries } from './hooks/useCountries';
import { SearchBar } from './components/SearchBar/SearchBar';
import { RegionFilter } from './components/RegionFilter/RegionFilter';
import { CountryList } from './components/CountryList/CountryList';
import { CountryDetail } from './components/CountryDetail/CountryDetail';
import styles from './App.module.scss';

export default function App() {
  const {
    filtered,
    loading,
    error,
    search,
    setSearch,
    region,
    setRegion,
    selected,
    setSelected,
  } = useCountries();

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.title}>World Atlas</h1>
          <p className={styles.subtitle}>Explore every nation on Earth</p>
        </div>
      </header>

      {/* Main layout */}
      <main className={styles.main}>
        {/* Left panel */}
        <aside className={styles.sidebar}>
          {/* Controls */}
          <div className={styles.controls}>
            <SearchBar value={search} onChange={setSearch} />
            <RegionFilter value={region} onChange={setRegion} />
          </div>

          {/* Count badge */}
          {!loading && !error && (
            <p className={styles.count}>
              <span className={styles.countNum}>{filtered.length}</span>
              {' '}countr{filtered.length === 1 ? 'y' : 'ies'} found
            </p>
          )}

          {/* List */}
          <div className={styles.listWrap}>
            <CountryList
              countries={filtered}
              selected={selected}
              onSelect={(c) => setSelected(selected?.cca3 === c.cca3 ? null : c)}
              loading={loading}
              error={error}
            />
          </div>
        </aside>

        {/* Right panel — detail */}
        <section className={styles.detail}>
          <CountryDetail
            country={selected}
            onClose={() => setSelected(null)}
          />
        </section>
      </main>
    </div>
  );
}
