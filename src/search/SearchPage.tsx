import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SearchView } from './ui/view/SearchView';

export default function SearchPage() {
  const { search } = useLocation();
  const [text_idx, setTextIdx] = useState<string>();
  useEffect(() => {
    const queryId: string = search.slice(
      search.indexOf('=') + 1,
      search.length
    );
    if (queryId.endsWith('%')) {
      let decodedQueryId = queryId;
      while (decodedQueryId.endsWith('%')) {
        decodedQueryId = decodedQueryId.substring(0, decodedQueryId.length - 1);
      }
      if (decodedQueryId.includes('%%')) {
        while (decodedQueryId.includes('%%')) {
          decodedQueryId = decodedQueryId.replace(/%%/, '%25%');
        }
        setTextIdx(decodeURI(decodedQueryId));
        return;
      }
      setTextIdx(decodeURI(decodedQueryId));
      return;
    }
    if (queryId.includes('%%')) {
      let decodedQueryId = queryId;
      while (decodedQueryId.includes('%%')) {
        decodedQueryId = decodedQueryId.replace(/%%/, '%25%');
      }
      setTextIdx(decodeURI(decodedQueryId));
      return;
    }
    setTextIdx(decodeURI(queryId));
  }, [search]);
  return <>{text_idx !== undefined && <SearchView text_idx={text_idx} />}</>;
}
