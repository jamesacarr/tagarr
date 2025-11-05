import { addTagToMovies } from './steps/add-tag-to-movies';
import { fetchMovies } from './steps/fetch-movies';
import { getListWithItems } from './steps/get-list-with-items';
import { groupMovies } from './steps/group-movies';
import { removeTagFromMovies } from './steps/remove-tag-from-movies';
import { updateListSynced } from './steps/update-list-synced';
import { validateRadarrConnection } from './steps/validate-radarr-connection';

export const tagMovies = async (listId: number) => {
  'use workflow';

  await validateRadarrConnection();
  const [list, movies] = await Promise.all([
    getListWithItems(listId),
    fetchMovies(),
  ]);
  await updateListSynced(listId, new Date().toISOString());
  if (list.itemIds.length === 0) {
    return {
      added: {
        count: 0,
        movies: [],
      },
      removed: {
        count: 0,
        movies: [],
      },
      tagId: list.tag_id,
    };
  }

  const { moviesToAdd, moviesToRemove } = await groupMovies(movies, list);
  await addTagToMovies(list.tag_id, moviesToAdd);
  await removeTagFromMovies(list.tag_id, moviesToRemove);

  return {
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
    tagId: list.tag_id,
  };
};
