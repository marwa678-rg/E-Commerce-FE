//GET Current Environment and set BaseUrl

export function baseUrlHandle() {
  return import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_BASE
    : import.meta.env.VITE_BACKEND_BASE_LOCAL;
}
