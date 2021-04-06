import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { setLectureFile } from '../../../store/LectureOverviewStore';
import { getFiles } from '../../../utility/depotFilesHelper';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';

async function parseLectureFile(
  cardContents: CardContents
): Promise<LectureFile | undefined> {
  const { fileBoxId } = cardContents;
  if (fileBoxId === undefined || fileBoxId === null || fileBoxId === '') {
    return undefined;
  }
  const lectureFile = await getFiles([fileBoxId]).then(files => ({ files }));
  return lectureFile;
}

export async function requestLectureCardFile(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { cardContents } = cardWithContentsAndRelatedCountRom;
  const lectureCardFile = await parseLectureFile(cardContents);
  setLectureFile(lectureCardFile);
}
