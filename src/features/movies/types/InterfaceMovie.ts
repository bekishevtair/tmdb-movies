export interface InterfaceMovie {
  id?: number;
  title?: string | null;
  name?: string | null;
  overview?: string | null;
  vote_average?: string | null;
  release_date?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  genres?: Record<string, string | number>[] | null;
}
