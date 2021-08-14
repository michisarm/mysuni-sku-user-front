import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';

interface BadgeTitleViewProps {
  college: string;
  name: string;
}

let count = 0;
export function BadgeTitleView({ college, name }: BadgeTitleViewProps) {
  ++count;
  if (count === 3) {
    ReactGA.pageview(
      window.location.pathname + window.location.search,
      [],
      `(Badge) - ${name}`
    );
  }

  useEffect(() => {
    return () => {
      count = 0;
    };
  }, []);

  return (
    <div className="title-area">
      <div className="college">{college}</div>
      <div className="title">{name}</div>
    </div>
  );
}
