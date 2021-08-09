import React from 'react';
import { findI18nResource } from 'shared/viewmodel/PolyglotText';

interface PolyglotTextProps {
  defaultString: string;
  id: string;
  values?: Record<string, string>;
}

export function PolyglotText(props: PolyglotTextProps) {
  const { defaultString, id, values } = props;
  return <>{getPolyglotText(defaultString, id, values)}</>;
}

export function getPolyglotText(
  defaultString: string,
  id: string,
  values?: Record<string, string>
) {
  let text = findI18nResource(id) || defaultString;
  if (values !== undefined) {
    Object.keys(values).forEach((key) => {
      text = text.replace('{' + key + '}', values[key]);
    });
  }
  return text;
}
