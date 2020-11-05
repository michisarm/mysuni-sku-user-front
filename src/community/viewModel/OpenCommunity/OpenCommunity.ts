import FieldItem from "./FieldItem";
import OpenCommunityItem from "./OpenCommunityItem";

export default interface OpenCommunity {
  fields: FieldItem[];
  communities: OpenCommunityItem[];
}