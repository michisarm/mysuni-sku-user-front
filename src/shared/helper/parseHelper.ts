import { findI18nResource } from '../viewmodel/PolyglotText';

export function parsePolyglotHTML(
  id: string,
  keyValue: string,
  value: any,
  defaultString: string,
  values?: Record<string, string>
): string {
  //
  let text = findI18nResource(id) || defaultString;
  console.log(findI18nResource(id));
  console.log(text);
  if (values !== undefined) {
    Object.keys(values).forEach((key) => {
      text = text.replace('{' + key + '}', values[key]);
    });
  }
  return text.replace('{' + keyValue + '}', value);
}
