
interface CategoryModel {
  id: string,
  text: string,
  path?: string,
  sub?: CategoryModel[],
}

export default CategoryModel;
