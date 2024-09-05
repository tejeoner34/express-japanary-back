export interface Sentence {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: string | null;
  license: string | null;
  translations: (Translation[] | [])[];
  transcriptions: Transcription[];
  audios: Audio[];
  lang_name: string;
  dir: string;
  lang_tag: string;
  is_favorite: boolean | null;
  is_owned_by_current_user: boolean;
  permissions: any; // Replace with specific permissions type if available
  max_visible_translations: number;
  current_user_review: any; // Replace with specific review type if available
}

export interface Translation {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script: string | null;
  transcriptions: Transcription[];
  audios: Audio[];
  isDirect: boolean;
  lang_name: string;
  dir: string;
  lang_tag: string;
}

export interface Transcription {
  id: number;
  sentence_id: number;
  script: string;
  text: string;
  user_id: number | null;
  needsReview: boolean;
  modified: string;
  user: User | null;
  readonly: boolean;
  type: string;
  html: string;
  markup: any;
  info_message: string;
}

export interface Audio {
  id: number;
  author: string;
  attribution_url: string | null;
  license: string | null;
}

export interface User {
  username: string;
}

export interface Paging {
  Sentences: {
    finder: string;
    page: number;
    current: number;
    count: number;
    perPage: number;
    start: number;
    end: number;
    prevPage: boolean;
    nextPage: boolean;
    pageCount: number;
    sort: string | null;
    direction: string | null;
    limit: number | null;
    sortDefault: boolean;
    directionDefault: boolean;
    scope: string | null;
    completeSort: any[]; // Replace with specific sort type if available
  };
}

export interface TatoeApiResult {
  paging: Paging;
  results: Sentence[];
}
