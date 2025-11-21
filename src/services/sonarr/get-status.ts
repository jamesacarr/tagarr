import ky from 'ky';

export const getStatus = async (url: string, apiKey: string) => {
  if (!url || !apiKey) {
    return false;
  }

  try {
    await ky.get(`${url}/api/v3/system/status`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    return true;
  } catch {
    return false;
  }
};
