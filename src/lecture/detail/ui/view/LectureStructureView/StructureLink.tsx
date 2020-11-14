import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface Props {
  can: boolean;
  onCannotClick: ()=>void;
}


const StructureLink: React.FC<LinkProps & Props > = function StructureLink(
  props
) {
  const { can, children, className, onCannotClick, ...restProps } = props;
  if (can) {
    return (
      <Link className={className} {...restProps}>
        {children}
      </Link>
    );
  } else {
    return <button onClick={onCannotClick} className={className}>{children}</button>;
  }
};

export default StructureLink;
