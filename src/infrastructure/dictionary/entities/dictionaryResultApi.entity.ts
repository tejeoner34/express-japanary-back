export interface DictionaryResultApi {
  meta: Meta;
  data: Datum[];
}

export interface Datum {
  slug: string;
  is_common: boolean;
  tags: string[];
  jlpt: string[];
  japanese: Japanese[];
  senses: SenseApi[];
  attribution: Attribution;
}

export interface Attribution {
  jmdict: boolean;
  jmnedict: boolean;
  dbpedia: boolean;
}

export interface Japanese {
  word: string;
  reading: string;
}

export interface SenseApi {
  english_definitions: string[];
  parts_of_speech: string[];
  links: string[];
  tags: string[];
  restrictions: any[];
  see_also: string[];
  antonyms: string[];
  source: string[];
  info: string[];
  sentences?: string[];
}

export interface Meta {
  status: number;
}
