import { fetchListsForService } from './fetch-lists-for-service';

export const fetchAllLists = async () => {
  const [radarrLists, sonarrLists] = await Promise.all([
    fetchListsForService('radarr'),
    fetchListsForService('sonarr'),
  ]);

  return [...radarrLists, ...sonarrLists];
};
