import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import '../logic/Footer.css';
import { CompanyList } from './CompanyList';

export function CompanyDropdown() {
  const [opened, setOpend] = useState(false);
  const companyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [companyRef, opened]);

  const companyToggle = () => {
    setOpend(!opened);
  };

  const handleClickOutside = (event: any) => {
    if (opened && !companyRef.current?.contains(event.target)) {
      setOpend(false);
    }
  };

  return (
    <div className="foot-site" ref={companyRef}>
      <div className="f-site-box">
        <div className="f-site-btnbox" onClick={companyToggle}>
          <span>Company Select</span>
          {opened === true ? (
            <Icon name="chevron down" style={{ transform: 'rotate(180deg)' }} />
          ) : (
            <Icon name="chevron down" />
          )}
        </div>
        {opened && (
          <div
            className="f-site-menu"
            style={{ display: 'block' }}
            onClick={companyToggle}
          >
            <CompanyList />
          </div>
        )}
      </div>
    </div>
  );
}
