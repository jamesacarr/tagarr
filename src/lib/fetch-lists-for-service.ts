import { getConfig } from '@/db/config/queries';
import { createArrService } from '@/services/arr-service';

export const fetchListsForService = async (service: 'radarr' | 'sonarr') => {
  const config = await getConfig();
  if (!config[`${service}_url`] || !config[`${service}_api_key`]) {
    return [];
  }

  const arrService = createArrService(
    service,
    config[`${service}_url`],
    config[`${service}_api_key`],
  );
  const { success } = await arrService.validateConfig();
  if (!success) {
    return [];
  }

  const lists = await arrService.getListsWithTags();
  return lists
    .map(list => ({
      ...list,
      service,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
