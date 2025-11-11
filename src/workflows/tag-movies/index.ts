import { addTagToMovies } from './steps/add-tag-to-movies';
import { fetchMovies } from './steps/fetch-movies';
import { getAllLists } from './steps/get-all-lists';
import { groupMovies } from './steps/group-movies';
import { removeTagFromMovies } from './steps/remove-tag-from-movies';
import { updateListSynced } from './steps/update-list-synced';
import { validateRadarrConnection } from './steps/validate-radarr-connection';

export const tagMovies = async () => {
  'use workflow';

  await validateRadarrConnection();

  const movies = await fetchMovies();
  const lists = await getAllLists();

  for (const list of lists) {
    await updateListSynced(list.id, new Date().toISOString());
  }

  const groupedMovies = await groupMovies(movies, lists);

  for (const { moviesToAdd, moviesToRemove, tagId } of groupedMovies) {
    await addTagToMovies(tagId, moviesToAdd);
    await removeTagFromMovies(tagId, moviesToRemove);
  }

  return groupedMovies.map(({ moviesToAdd, moviesToRemove, tagId }) => ({
    added: {
      count: moviesToAdd.length,
      movies: moviesToAdd.map(movie => ({
        id: movie.id,
        title: movie.title,
        tmdbId: movie.tmdbId,
      })),
    },
    removed: {
      count: moviesToRemove.length,
      movies: moviesToRemove.map(movie => ({
        id: movie.id,
        title: movie.title,
        tmdbId: movie.tmdbId,
      })),
    },
    tagId,
  }));
};
