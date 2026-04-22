import { useState, useEffect, useMemo } from 'react';
import type { Country, Region } from '../types/country';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('');
  const [selected, setSelected] = useState<Country | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Country[]>;
      })
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError('Failed to load countries. Please try again.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchesSearch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion = region === '' || c.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [countries, search, region]);

  return {
    filtered,
    loading,
    error,
    search,
    setSearch,
    region,
    setRegion,
    selected,
    setSelected,
  };
}
