
import { stores as learningStores } from '@sku/learning';

import { sharedService } from './shared';
import { InstructorService } from './expert';
import { CollegeService } from './college';
import { SkProfileService } from './profile';


const stores = {
  ...learningStores,
  sharedService,
  instructorService: InstructorService.instance,
  collegeService: CollegeService.instance,
  skProfileService: SkProfileService.instance,
};

export default stores;
