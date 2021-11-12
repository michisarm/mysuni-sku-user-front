import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCategory } from 'shared/service/useCollege/useRequestCategory';
import { useAbtestUserTarget } from './abtest/service/useAbtestUserTarget';

export default function AppInitializer() {
  useRequestCategory();
  useRequestBadgeCategory();
  useAbtestUserTarget();
  return null;
}
