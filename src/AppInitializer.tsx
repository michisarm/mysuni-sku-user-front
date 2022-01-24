import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCategory } from 'shared/service/useCollege/useRequestCategory';
import { useAbtestUserTarget } from './abtest/service/useAbtestUserTarget';
import { useRequestUserWorkspaces } from 'shared/service/useRequestUserWorkspaces';

export default function AppInitializer() {
  useRequestUserWorkspaces();
  useRequestCategory();
  useRequestBadgeCategory();
  useAbtestUserTarget();
  return null;
}
