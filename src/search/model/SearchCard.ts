import { DifficultyLevel } from '../../lecture/model/DifficultyLevel';
import CardType from '../../lecture/shared/model/CardType';
import { Category } from '../../shared/model/Category';

export interface SearchCardCategory extends Category {
  mainCategory: number;
}

export interface SearchCard {
  patron_key_string: string; //
  required_cinerooms: string; // 배열로 변경필요
  categories: string;
  access_rules: string; //
  id: string; //
  name: string; //
  difficulty_level: DifficultyLevel; //
  thumb_image_path: string; //
  learning_time: string; //
  stamp_count: string; //
  use_whitelist_policy: string; //
  additional_learning_time: string; //
  type: CardType;
  simple_description: string;
  passed_student_count: string; //
  student_count: string; //
  star_count: string; //
  used_in_badge: string; //
  learning_start_date: string; //
  learning_end_date: string; //
  applying_start_date: string; //
  applying_end_date: string; //
  cube_types: string; //
  cube_organizer_names: string; //
}
