import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCollege } from './shared/service/useCollege/useRequestCollege';
import { useRequestCineroom } from './shared/service/useCineroom/useRequestCineroom';

export default function AppInitializer() {
  useRequestCollege();
  useRequestCineroom();
  useRequestBadgeCategory();

  return null;
}
