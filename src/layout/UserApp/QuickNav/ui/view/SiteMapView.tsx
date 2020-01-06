
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

// import { Icon } from 'semantic-ui-react';


interface Props {
  topSiteMaps: SiteMap[]
  bottomSiteMaps: SiteMap[]
  onClickItem: (e: any, data: any) => void,
}

export interface SiteMap {
  name: string
  items: SiteMapItem[]
  countable?: boolean
}

export interface SiteMapItem {
  name: string
  path: string
  count?: number
}

@reactAutobind
@observer
class SiteMapView extends Component<Props> {
  //
  renderSiteMaps(siteMaps: SiteMap[]) {
    //
    const { onClickItem } = this.props;

    return (
      <ul>
        {siteMaps.map((siteMap, index) => (
          <li key={`site-map-${index}`}>
            <span>{siteMap.name}</span>
            <ul>
              {siteMap.items.map((siteMapItem, number) => (
                <li key={`site-map-item-${number}`}>
                  <a onClick={(e) => onClickItem(e, { item: siteMapItem })}>
                    <span className="underline">{siteMapItem.name}</span>
                    { siteMap.countable && (
                      <span className="count">(<em>{siteMapItem.count}</em>)</span>
                    )}
                    {/*<Icon className="new16 icon" /><span className="blind">new</span>*/}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    //
    const { topSiteMaps, bottomSiteMaps } = this.props;

    return (
      <div className="site-map">
        {this.renderSiteMaps(topSiteMaps)}
        {this.renderSiteMaps(bottomSiteMaps)}
      </div>
    );
  }
}

export default SiteMapView;
