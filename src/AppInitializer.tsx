import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCategory } from 'shared/service/useCollege/useRequestCategory';
import { useAbtestUserTarget } from './abtest/service/useAbtestUserTarget';
import { useRequestWorkspaces } from 'shared/service/useRequestWorkspaces';

export default function AppInitializer() {
  useRequestWorkspaces();
  useRequestCategory();
  useRequestBadgeCategory();
  useAbtestUserTarget();
  return null;
}
