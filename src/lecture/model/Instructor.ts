export interface Instructor {
  instructorId: string;
  representative: boolean;
  round: Number;
  memberSummary?: {
    employeeId: string;
    department: string;
    email: string;
    name: string;
    photoId: string;
  };
}
