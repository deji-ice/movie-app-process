const DEFAULT_PARAMS = {
  language: "en-US",
};

export const buildApiUrl = (media, id, params = {}) => {
  if (!id) throw new Error("ID is required");

  const endpoint =
    media.seasons || media.number_of_seasons || media.media_type === "tv"
      ? "tv"
      : "movie";
  const queryParams = new URLSearchParams({
    ...DEFAULT_PARAMS,
    ...params,
  });

  return `${
    import.meta.env.VITE_TMDB_API_BASE_URL
  }/${endpoint}/${id}?${queryParams}`;
};

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};
