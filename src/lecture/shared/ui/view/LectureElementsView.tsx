
import React from 'react';
import classNames from 'classnames';
import { Icon, Image, Label } from 'semantic-ui-react';
import { CategoryModel } from 'shared/model';


interface TitleProps {
  title: string | React.ReactNode,
  category?: CategoryModel,
  children?: React.ReactNode,
}

export const Title = ({ category, title, children }: TitleProps) => (
  <div className="title-area">
    {category && category.college.name && <Label className={category.color}>{category.college.name}</Label>}
    <div className="header">{title}</div>
    {children}
  </div>
);


interface FieldProps {
  icon: string,
  text: string,
  bold?: boolean,
  subField?: React.ReactNode,
}

export const Field = ({ icon, text, bold, subField }: FieldProps) => (
  <div className="li">
    <Label className={`onlytext ${bold ? 'bold' : ''}`}>
      <Icon className={icon} />
      <span>{text}</span>
    </Label>
    {subField}
  </div>
);


interface SubFieldProps {
  icon: string,
  text: React.ReactNode,
  className?: string,
  bold?: boolean,
  children?: React.ReactNode
}

export const SubField = ({ icon, text, className = '', bold = false, children = null }: SubFieldProps) => (
  <Label className={classNames('onlytext', { bold }, className)}>
    <Icon className={icon} />
    <span>{text}</span>
    {children}
  </Label>
);


interface FieldsProps {
  children?: React.ReactNode,
}

export const Fields = ({ children }: FieldsProps) => (
  <div className="icon-area">
    {children}
  </div>
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
    { required && <Label className="ribbon2">핵인싸과정</Label>}
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
