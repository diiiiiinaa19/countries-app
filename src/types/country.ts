export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  population: number;
  cca3: string;
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | '';
