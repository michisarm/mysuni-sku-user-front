import Student from '../../model/Student';

export function findCubeStudent(
  cubeId: string,
  cubeStudents: Student[] | undefined | null
) {
  if (!Array.isArray(cubeStudents) || cubeStudents.length === 0) {
    return undefined;
  }
  const students = cubeStudents.filter(c => c.lectureId === cubeId);
  if (students === undefined) {
    return undefined;
  }
  if (students.length === 0) {
    return students[0];
  }
  const student = students.sort((a, b) => b.updateTime - a.updateTime)[0];
  return student;
}
