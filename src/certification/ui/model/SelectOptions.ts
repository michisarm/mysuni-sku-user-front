import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

const SelectOptions = {
  difficultyLevel: [
    {
      key: '0',
      text: getPolyglotText('전체', 'Certification-bdls-sl전체'),
      value: '',
    },
    { key: '1', text: 'Level1', value: 'Level1' },
    { key: '2', text: 'Level2', value: 'Level2' },
    { key: '3', text: 'Level3', value: 'Level3' },
  ],
};

export default SelectOptions;
