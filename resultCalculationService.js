/**
 * Core Academic Engine.
 * Calculates grades, aggregates, and positions dynamically based on school settings.
 */
class ResultCalculationService {

  /**
   * Standard percentage for a single subject.
   */
  static calculateSubjectPercentage(obtainedMarks, totalMarks, precision = 2) {
    if (totalMarks === 0) return 0;
    const percentage = (obtainedMarks / totalMarks) * 100;
    return Number(percentage.toFixed(precision));
  }

  /**
   * Maps a raw percentage to the school's specific grade rules.
   * @param {number} percentage - The calculated percentage
   * @param {Array} gradeRules - Configured array [{min: 90, max: 100, name: 'A+', remarks: 'Excellent'}]
   */
  static calculateGrade(percentage, gradeRules) {
    const rule = gradeRules.find(r => percentage >= r.minPercentage && percentage <= r.maxPercentage);
    return rule ? { grade: rule.name, remarks: rule.remarks } : { grade: 'N/A', remarks: '' };
  }

  static calculatePassFail(percentage, passingPercentage, status) {
    if (status === 'absent') return 'absent';
    return percentage >= passingPercentage ? 'pass' : 'fail';
  }

  /**
   * Calculates an Annual/Aggregate Result across multiple periods using school-configured weightages.
   * Period Object: { percentage: 80, weightage: 30 }
   */
  static calculateWeightedAggregate(periodResults, precision = 2) {
    let aggregate = 0;
    let totalWeightApplied = 0;

    periodResults.forEach(period => {
      if (period.percentage !== null && period.percentage !== undefined) {
        const weightFactor = period.weightage / 100;
        aggregate += (period.percentage * weightFactor);
        totalWeightApplied += period.weightage;
      }
    });

    // Normalize if weights don't equal exactly 100 (e.g. term missed/exempted)
    if (totalWeightApplied > 0 && totalWeightApplied !== 100) {
      aggregate = (aggregate / totalWeightApplied) * 100;
    }

    return Number(aggregate.toFixed(precision));
  }

  /**
   * Generates rank/position based on aggregates.
   */
  static calculatePosition(studentsList) {
    const sorted = [...studentsList].sort((a, b) => b.aggregatePercentage - a.aggregatePercentage);
    
    let currentRank = 1;
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i].aggregatePercentage === sorted[i - 1].aggregatePercentage) {
        sorted[i].position = sorted[i - 1].position; // Tie logic
      } else {
        sorted[i].position = currentRank;
      }
      currentRank++;
    }
    return sorted;
  }
}

module.exports = ResultCalculationService;
