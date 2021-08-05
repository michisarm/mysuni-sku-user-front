import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCollege } from './shared/service/useCollege/useRequestCollege';
import { useRequestLearningStorage } from './myTraining/service/useRequestLearningStorage';
import { useAbtestUserTarget } from './abtest/service/useAbtestUserTarget';

export default function AppInitializer() {
  useRequestCollege();
  useRequestLearningStorage();
  useRequestBadgeCategory();
  useAbtestUserTarget();
  return null;
}
