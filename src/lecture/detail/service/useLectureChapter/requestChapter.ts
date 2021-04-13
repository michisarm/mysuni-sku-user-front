import { useState, useEffect } from 'react';
import { findCardCache } from '../../../detail/api/cardApi';

export async function requestChapter(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);

  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }

  const { card, cardContents } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }

  //params id 값으로 해당 챕터 값 찾아오는 함수
}
