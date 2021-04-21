export interface Instructor {
  instructorId: string;
  representative: boolean;
  memberSummary?: {
    department: string;
    email: string;
    name: string;
    photoId: string;
  };
}
