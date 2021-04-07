import { useRequestCollege } from './shared/service/useCollege/useRequestCollege';

export default function AppInitializer() {
  useRequestCollege();

  return null;
}
