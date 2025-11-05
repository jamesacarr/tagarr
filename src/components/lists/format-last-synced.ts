export const formatLastSynced = (lastSyncedAt: string | null) => {
  if (!lastSyncedAt) {
    return 'Never';
  }

  return new Date(lastSyncedAt).toLocaleString(navigator.language);
};
