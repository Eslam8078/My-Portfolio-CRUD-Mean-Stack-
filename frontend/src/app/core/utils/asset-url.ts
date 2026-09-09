import { environment } from '../../../environments/environment';

export function resolveAssetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return path.startsWith('/uploads/') ? `${environment.apiOrigin}${path}` : path;
}
