
import React from 'react';


const AppContext = React.createContext({
  breadcrumb: {
    values: [],
    setBreadcrumb: (breadcrumbValues: { text: string, path?: string}[]) => {},
  },
});

export interface BreadcrumbValue {
  text: string,
  path?: string,
}

export default AppContext;
