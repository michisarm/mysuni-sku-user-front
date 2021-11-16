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
