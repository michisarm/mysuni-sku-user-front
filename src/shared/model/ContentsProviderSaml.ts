export interface ContentsProviderSaml {
  id: string;
  contentsProviderId: string;
  contentsProviderName: string;
  contentsProviderDirectConnections: {
    loginUserSourceType: 'GDI' | 'CHECKPOINT_SAML';
    directConnectionName: string;
    targetSamlInstanceName: string;
    directConnection: string;
  }[];
}
