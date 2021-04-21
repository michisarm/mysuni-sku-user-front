import { IdName, PatronKey } from '@nara.platform/accent';

export default interface ContentsProvider {
  contentsProviderType: IdName;
  expiryDate: string;
  url: string;
}
