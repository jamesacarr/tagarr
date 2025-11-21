import ky from 'ky';

export const ping = async (url: string) => {
  if (!url) {
    return false;
  }

  try {
    await ky.get(`${url}/ping`);

    return true;
  } catch {
    return false;
  }
};
