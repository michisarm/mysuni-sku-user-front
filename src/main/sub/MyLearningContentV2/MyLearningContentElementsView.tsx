import React, { FunctionComponent } from 'react';
import { Segment } from 'semantic-ui-react';
import classNames from 'classnames';
import { Type, AreaType } from 'tracker/model';

interface ContentWrapperProps {
  className?: string;
  dataArea?: AreaType;
  dataType?: Type;
}

export const ContentWrapper: FunctionComponent<ContentWrapperProps> = ({
  children,
  className,
  dataArea,
  dataType,
}) => (
  <div
    className={classNames('scrolling-area', className)}
    data-area={dataArea}
    data-type={dataType}
  >
    <Segment className="full">{children}</Segment>
  </div>
);

interface TabsViewProps {
  children: React.ReactNode;
}

export const TabsView: FunctionComponent<TabsViewProps> = ({ children }) => (
  <Segment className="full">
    <div className="ui tab-menu">
      <div className="cont-inner">
        <div className="ui sku menu">{children}</div>
      </div>
    </div>
  </Segment>
);

// Badge => Badge 개발 후 수정 필요
interface BadgeWrapperProps {
  className?: string;
  onClick?: () => void;
}

export const BadgeWrapper: FunctionComponent<BadgeWrapperProps> = ({
  children,
  className,
  onClick,
}) => (
  <div className={classNames('badge', className)} onClick={onClick}>
    {children}
  </div>
);

interface MainBannerProps {
  children: React.ReactNode;
}

export const MainBannerWrapper: FunctionComponent<MainBannerProps> = ({
  children,
}) => (
  <div
    className="middle-swiper"
    data-area={AreaType.MAIN_BANNER}
    data-type={Type.CLICK}
  >
    <Segment className="full">
      <div className="swiper-section type2">{children}</div>
    </Segment>
  </div>
);
