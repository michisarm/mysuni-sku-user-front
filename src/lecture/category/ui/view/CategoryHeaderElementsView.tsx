
import React from 'react';
import { Image } from 'semantic-ui-react';


interface ThumbnailProps {
  image: string,
}

export const ThumbnailView: React.FC<ThumbnailProps> = ({ image }) => (
  <div>
    <Image src={image} alt="College thumbnail" />
  </div>
);


interface TitleProps {
  title: string,
  subtitle: string,
  description: string,
}

export const TitleView: React.FC<TitleProps> = ({ title, subtitle, description }) => (
  <>
    <h2 className="college-name">{title}</h2>
    <p>
      <em>{subtitle}</em>
      {description}
    </p>
  </>
);
