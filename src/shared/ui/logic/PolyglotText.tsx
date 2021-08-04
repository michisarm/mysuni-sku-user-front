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
  let text = defaultString;
  if (values !== undefined) {
    Object.keys(values).forEach((key) => {
      text = text.replace('{' + key + '}', values[key]);
    });
  }
  return text;
}
