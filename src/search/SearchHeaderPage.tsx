import React from 'react';
import { SearchHeaderView } from './views/SearchHeaderView';
import {
  setSearchPopular1MList,
  setSearchPopular1YList,
  setSearchPopular6MList,
  setSearchRecentList,
} from './search.services';

export function SearchHeaderPage() {
  //

  setSearchPopular1MList([
    'AI',
    '인공지능',
    '디지털 트랜스포메이션트랜스포메이션트랜스포메이션트랜스포메이션',
    'Digital Transformation',
    '행복의 비결',
    'SV',
    '파이썬파이썬파이썬파이썬파이썬파이썬파이썬파이썬파이썬파이썬파이썬',
    'Hello, Python',
    '공정무역',
    'DT',
  ]);
  setSearchPopular6MList([
    '인공지능인공지능인공지능인공지능인공지능인공지능인공지능인공지능인공지능',
    '파이썬',
    '디지털 트랜스포메이션',
    'Digital Transformation',
    '행복의 비결',
    'SVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSVSV',
    'AI',
    'Hello, Python',
    '공정무역',
    'DT',
  ]);
  setSearchPopular1YList([
    '공정무역',
    '파이썬',
    '디지털 트랜스포메이션',
    'Digital Transformation',
    '행복의 비결',
    'SV',
    'AI',
    'Hello, Python',
    '인공지능',
    'DT',
  ]);
  return (
    <>
      <SearchHeaderView />
    </>
  );
}
