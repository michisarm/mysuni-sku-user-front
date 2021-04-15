export interface ContentsProvider {
  areaType: string;
  contentsProvider: {
    id: string;
    name: string;
  };
  creatorEmail: string;
  creatorId: string;
  creatorName: string;
  depotId: string;
  id: string;
  patronKey: {
    keyString: string;
  };
  link: boolean;
  providerEmail: string;
  providerName: string;
  providerPhoneNumber: string;
  providerUrl: string;
  remark: string;
  thumbnail: string;
  time: number;
  use: boolean;
}