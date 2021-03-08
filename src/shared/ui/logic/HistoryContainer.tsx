import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setCurrentHistory } from '../../store/HistoryStore';

export default function HistoryContainer() {
  const history = useHistory();
  useEffect(() => {
    setCurrentHistory(history);
  }, [history]);

  return null;
}
