import { useRequestBadgeCategory } from './certification/service/useRequestBadgeCategory';
import { useRequestCollege } from './shared/service/useCollege/useRequestCollege';
import { useRequestCineroom } from './shared/service/useCineroom/useRequestCineroom';
import { useRequestLearningStorage } from './myTraining/service/useRequestLearningStorage';
import { useAbtestUserTarget } from './abtest/service/useAbtestUserTarget';

export default function AppInitializer() {
  useRequestCollege();
  useRequestCineroom();
  useRequestLearningStorage();
  useRequestBadgeCategory();
  useAbtestUserTarget();
  return null;
}
