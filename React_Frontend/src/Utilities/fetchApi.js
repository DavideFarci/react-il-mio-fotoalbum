/* eslint-disable no-useless-catch */
export async function fetchApi(path, method = 'GET', body = null) {
  try {
    const resp = await fetch(import.meta.env.VITE_API_URL + path, {
      method,
      headers: {
        'Content-Type': body instanceof FormData ? null : 'application/json',
        Authorization: localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : null,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(
        data.message ??
          "A causa di un errore non è possibile eseguire l'accesso",
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}
