export interface ContentsProviderInfo {
  id: string;
  areaType: string;
  name: string;
  enabled: boolean;
  phoneNumber: string | null;
  email: string | null;
  url: string | null;
  thumbnailPath: string | null;
  depotId: string | null;
  remark: string | null;
  creator: {
    keyString: string | null;
  };
  link: boolean;
  pisAgree: boolean;
}
