import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCollege } from './shared/service/useCollege/useRequestCollege';

export default function AppInitializer() {
  useRequestCollege();
  useRequestBadgeCategory();

  return null;
}
