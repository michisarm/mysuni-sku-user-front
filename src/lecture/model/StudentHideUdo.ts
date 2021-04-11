class StudentHideUdo {
  private readonly lectureIds: string[] = [];

  private constructor(lectureIds: string[]) {
    this.lectureIds = lectureIds;
  }

  public static create(selectedServiceIds: string[]) {
    return new StudentHideUdo(selectedServiceIds);
  }
}

export default StudentHideUdo;