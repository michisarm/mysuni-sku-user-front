
import React from 'react';
import { Icon } from 'semantic-ui-react';


interface ThumbnailProps {
  icon: string,
}

export const ThumbnailView: React.FC<ThumbnailProps> = ({ icon }) => (
  <div>
    <Icon className={icon} /><span className="blind">DT</span>
  </div>
);


interface TitleProps {
  title: string,
  subtitle?: string,
  description?: string,
}

export const TitleView: React.FC<TitleProps> = ({ title, subtitle, description }) => (
  <>
    <h2 className="college-name">{title}</h2>
    <p dangerouslySetInnerHTML={{ __html: subtitle || '' }} />
  </>
);
