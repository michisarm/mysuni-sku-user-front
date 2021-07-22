import React from 'react';

interface PolyglotTextProps {
  defaultString: string;
  id: string;
  values?: Record<string, string>;
}

export function PolyglotText(props: PolyglotTextProps) {
  const { defaultString, id, values } = props;
  return <>{defaultString}</>;
}

export function getPolyglotText(
  defaultString: string,
  id: string,
  values?: Record<string, string>
) {
  return defaultString;
}
