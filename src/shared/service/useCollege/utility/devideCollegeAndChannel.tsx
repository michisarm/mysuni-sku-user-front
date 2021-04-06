import { CollegeModel } from '../../../../college/model/CollegeModel';

type College = Pick<CollegeModel, "id" | "name">;

export function devideCollegeAndChannel(list: CollegeModel[]) {
  return list.reduce((acc, curr) => {
    acc.colleges.push({id: curr.id, name: curr.name});
    acc.channels.push(...curr.channels)
    
    return acc
  },{colleges: [] as College[], channels: [] as College[]})
}
