export const gradeCount = (point: number) => {
  let result = {
    grade: 'NA',
    gradePoint: 0,
  };

  /**
   * 0-19 = F
   * 20-39 = D
   * 40-59 = C
   * 60-79 = B
   * 80-100 = A
   */

  if (point >= 0 && point <= 19) {
    result = {
      grade: 'F',
      gradePoint: 0,
    };
  } else if (point >= 20 && point <= 39) {
    result = {
      grade: 'D',
      gradePoint: 2.5,
    };
  } else if (point >= 40 && point <= 59) {
    result = {
      grade: 'C',
      gradePoint: 3,
    };
  } else if (point >= 60 && point <= 79) {
    result = {
      grade: 'B',
      gradePoint: 3.25,
    };
  } else if (point >= 80 && point <= 100) {
    result = {
      grade: 'BA',
      gradePoint: 4.0,
    };
  } else {
    result = {
      grade: 'NA',
      gradePoint: 0,
    };
  }
  return result;
};
