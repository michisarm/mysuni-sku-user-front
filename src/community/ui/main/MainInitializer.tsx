import { useRequestMain } from './main.request.services';

export function MainInitializer() {
  useRequestMain();
  return null;
}
