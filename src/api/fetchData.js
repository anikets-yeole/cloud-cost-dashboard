export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new ApiError(`Request failed: ${res.status}`, res.status);
    return await res.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(err.message || "Network error", 0);
  }
}
