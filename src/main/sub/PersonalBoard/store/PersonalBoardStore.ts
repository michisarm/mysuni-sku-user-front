import BadgeLearningTime from '../viewModel/BadgeLearningTime';
import LearningObjectives from '../viewModel/LearningObjectives';
import LearningTimeByArea from '../viewModel/LearningTimeByArea';
import LearningTimeDetail from '../viewModel/LearningTimeDetail';
import MyCompanyPopularCourse from '../viewModel/MyCompanyPopularCourse';
import { createStore } from './Store';

const [
    setBadgeLearningTimeItem, 
    onBadgeLearningTimeItem, 
    getBadgeLearningTimeItem,
    useBadgeLearningTimeItem
] = createStore<BadgeLearningTime>(
    {
        badgeMyCount: 0,
        AllBadgeMyCount: 0,
        companyAvgBadgeCount: 0,
        allCompanyAvgBadgeCount: 0,
        mylearningTimeHour: 0,
        mylearningTimeMinute: 0,
        allMylearningTime: 0,
        companyAvglearningTime: 0,
        allCompanyAvglearningTime: 0
    }
);

const [
    setCollegeTopChartItem, 
    onCollegeTopChartItem, 
    getCollegeTopChartItem,
    useCollegeTopChartItem
    //추후 백엔드 정립 되면 타입 수정
] = createStore<any>();

const [
    setLearningTimeDetailItem, 
    onLearningTimeDetailItem, 
    getLearningTimeDetailItem,
    useLearningTimeDetailItem
] = createStore<LearningTimeDetail>({
    suniLearningTime: 0,
    displayMyCompanyLearningTime: 0,
    aplAllowTime: 0,
    totalCollegeTime: 0
});

const [
    setLearningTimeByAreaItem, 
    onLearningTimeByAreaItem, 
    getLearningTimeByAreaItem,
    useLearningTimeByAreaItem
] = createStore<LearningTimeByArea>({
    ai: 0,
    dt: 0,
    happiness: 0,
    sv: 0,
    innovativeDesign: 0
});

const [
    setLearningObjectivesItem, 
    onLearningObjectivesItem, 
    getLearningObjectivesItem,
    useLearningObjectivesItem
] = createStore<LearningObjectives>({
    AnnualLearningObjectives: 0,
    WeekAttendanceGoal: 0,
    DailyLearningTimeHour: 0,
    DailyLearningTimeMinute: 0,
});

const [
    setPopularCourseItem, 
    onPopularCourseItem, 
    getPopularCourseItem,
    usePopularCourseItem
] = createStore<object[]>([]);

export {
    setBadgeLearningTimeItem,
    onBadgeLearningTimeItem,
    getBadgeLearningTimeItem,
    useBadgeLearningTimeItem,
    setCollegeTopChartItem, 
    onCollegeTopChartItem, 
    getCollegeTopChartItem,
    useCollegeTopChartItem,
    setLearningTimeDetailItem, 
    onLearningTimeDetailItem, 
    getLearningTimeDetailItem,
    useLearningTimeDetailItem,
    setLearningTimeByAreaItem, 
    onLearningTimeByAreaItem, 
    getLearningTimeByAreaItem,
    useLearningTimeByAreaItem,
    setLearningObjectivesItem, 
    onLearningObjectivesItem, 
    getLearningObjectivesItem,
    useLearningObjectivesItem,
    setPopularCourseItem, 
    onPopularCourseItem, 
    getPopularCourseItem,
    usePopularCourseItem
}