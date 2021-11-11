import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCollege } from './shared/service/useCollege/useRequestCollege';
import { useRequestCategory } from 'shared/service/useCollege/useRequestCategory';
import { useAbtestUserTarget } from './abtest/service/useAbtestUserTarget';

export default function AppInitializer() {
  useRequestCollege();
  useRequestCategory();
  useRequestBadgeCategory();
  useAbtestUserTarget();
  return null;
}
