import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { MyPageRouteParams } from '../model/MyPageRouteParams';
import FilterCountService from '../present/logic/FilterCountService';

// export function useRequestFilterCountView() {
//   const params = useParams<MyTrainingRouteParams | MyPageRouteParams>();
//   const contentType = params.tab;

//   useEffect(() => {
//     FilterCountService.instance.findAllFilterCountViews(contentType);

//     return () => {
//       FilterCountService.instance.clearAllFilterCountViews();
//     };
//   }, [params.tab]);
// }
