import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface Props {
  can: boolean;
  onCannotClick: () => void;
}

const StructureLink: React.FC<LinkProps & Props> = function StructureLink(
  props
) {
  const { can, children, className, onCannotClick, ...restProps } = props;
  if (can) {
    return (
      <Link
        className={className}
        {...restProps}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <a onClick={onCannotClick} className={className}>
        {children}
      </a>
    );
  }
};

export default StructureLink;
