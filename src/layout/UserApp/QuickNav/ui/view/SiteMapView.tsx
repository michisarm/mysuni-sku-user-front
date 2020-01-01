
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Icon } from 'semantic-ui-react';


interface Props {
  topSiteMaps: SiteMap[]
  bottomSiteMaps: SiteMap[]
  onClickItem: (e: any, data: any) => void,
}

interface SiteMap {
  name: string
  items: SiteMapItem[]
}

interface SiteMapItem {
  name: string
  path: string
}

class SiteMapView extends Component<Props> {
  //
  renderSiteMaps(siteMaps: SiteMap[]) {
    //
    const { onClickItem } = this.props;

    return (
      <ul>
        {siteMaps.map((siteMap) => (
          <li>
            <span>{siteMap.name}</span>
            <ul>
              {siteMap.items.map((siteMapItem) => (
                <li>
                  <a onClick={(e) => onClickItem(e, { item: siteMapItem })}>
                    <span className="underline">{siteMapItem.name}</span>
                    {/*<span className="count">(<em>24</em>)</span>*/}
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
        {/*<li>*/}
        {/*  <span>Category</span>*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <a href="#">*/}
        {/*        <span className="underline">AI</span>*/}
        {/*        /!*<span className="count">(<em>24</em>)</span>*!/*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#">*/}
        {/*        <span className="underline">DT</span>*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#">*/}
        {/*        <span className="underline">행복</span>*/}
        {/*        <span className="count">(<em>2</em>)</span>*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#">*/}
        {/*        <span className="underline">SV</span>*/}
        {/*        <span className="count">(<em>12</em>)</span>*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">혁신디자인</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Global</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Leadership</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Management</span></a>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <span>Learning</span>*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">In progress</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">In My List</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Enrolled</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Required</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Completed List</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Retry</span></a>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <span>Recommend</span>*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">Recommend</span></a>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <span>Community</span>*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">My Community</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">My Created Community</span></a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a href="#"><span className="underline">My Feed</span></a>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</li>*/}
        {/*</ul>*/}
        {/*<ul>*/}
        {/*  <li>*/}
        {/*    <span>Introduction</span>*/}
        {/*    <ul>*/}
        {/*      <li>*/}
        {/*        <a href="#"><span className="underline">SUNI 소개</span></a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="#"><span className="underline">College 소개</span></a>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <span>Create</span>*/}
        {/*    <ul>*/}
        {/*      <li>*/}
        {/*        <a href="#"><span className="underline">Create</span></a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="#">*/}
        {/*          <span className="underline">Shared</span>*/}
        {/*          <span className="count">(24)</span>*/}
        {/*        </a>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <span>My Page</span>*/}
        {/*    <ul>*/}
        {/*      <li>*/}
        {/*        <a href="#">*/}
        {/*          <span className="underline">Completed List</span>*/}
        {/*          <span className="count">(<em>11</em>)</span>*/}
        {/*        </a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="#">*/}
        {/*          <span className="underline">Earned Stamp List</span>*/}
        {/*          <span className="count">(<em>2</em>)</span>*/}
        {/*          <Icon className="new16 icon" /><span className="blind">new</span>*/}
        {/*        </a>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <span>Support</span>*/}
        {/*    <ul>*/}
        {/*      <li>*/}
        {/*        <a href="#"><span className="underline">Notice</span></a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="#"><span className="underline">FAQ</span></a>*/}
        {/*      </li>*/}
        {/*      <li>*/}
        {/*        <a href="#"><span className="underline">Q&amp;A</span></a>*/}
        {/*      </li>*/}
        {/*    </ul>*/}
        {/*  </li>*/}
        {/*</ul>*/}
      </div>
    );
  }
}

export default SiteMapView;
