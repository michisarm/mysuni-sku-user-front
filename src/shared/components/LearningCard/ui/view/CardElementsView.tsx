
import React from 'react';
import { Icon, Image, Label } from 'semantic-ui-react';
import { CategoryType } from '../../present/model';


interface TitleProps {
  title: string,
  category?: CategoryType,
  children?: React.ReactNode,
}

export const Title = ({ category, title, children }: TitleProps) => {
  //
  let color: any;

  switch (category) {
    case CategoryType.AI:
      color = 'purple';
      break;
    case CategoryType.Global:
      color = 'green';
      break;
    default:
      color = 'blue';
  }

  return (
    <div className="title-area">
      <Label color={color}>{category}</Label>
      <div className="header">{title}</div>
      {children}
    </div>
  );
};


interface FieldsProps {
  children?: React.ReactNode,
}

export const Fields = ({ children }: FieldsProps) => (
  <div className="icon-area">
    {children}
  </div>
);


interface FieldProps {
  icon: string,
  text: string,
  bold?: boolean,
}

export const Field = ({ icon, text, bold }: FieldProps) => (
  <Label className={`onlytext ${bold ? 'bold' : ''}`}>
    <Icon className={icon} />
    <span>{text}</span>
  </Label>
);


interface ButtonsProps {
  children?: React.ReactNode,
}

export const Buttons = ({ children }: ButtonsProps) => (
  <div className="btn-area">
    {children}
  </div>
);


interface RibbonProps {
  required?: boolean,
  stampReady?: boolean,
}

export const Ribbon = ({ required, stampReady }: RibbonProps) => (
  <div className="card-ribbon-wrap">
    { required && <Label className="ribbon2">Required</Label>}
    { stampReady && <Label className="ribbon2">Stamp</Label>}
  </div>
);


interface ThumbnailProps {
  image?: string,
}

export const Thumbnail = ({ image }: ThumbnailProps) => (
  <div className="thumbnail">
    {image && (
      <Image
        alt="card-thumbnail"
        size="small"
        src={image}
      />
    )}
  </div>
);
