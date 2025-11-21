import { fetchRadarrLists } from './fetch-radarr-lists';
import { fetchSonarrLists } from './fetch-sonarr-lists';

export const fetchAllLists = async () => {
  const [radarrLists, sonarrLists] = await Promise.all([
    fetchRadarrLists(),
    fetchSonarrLists(),
  ]);

  return [...radarrLists, ...sonarrLists];
};
