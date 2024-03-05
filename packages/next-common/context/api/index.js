import { createContext, useContext, useEffect } from "react";
import { useChain } from "next-common/context/chain";

const ApiContext = createContext(null);

export default function ApiProvider({ children }) {
  const chain = useChain();
  // const currentEndpoint = useSelector(currentNodeSelector);
  // const dispatch = useDispatch();
  // const { endpoints } = useChainSettings();
  // const candidateNodes = useSelector(initCandidateNodesSelector);
  // console.log("ApiProvider", "candidateNodes", candidateNodes);

  useEffect(() => {}, [chain]);

  // useEffect(() => {
  //   if (nowApi && currentEndpoint && nowApi?._options.provider.endpoint === currentEndpoint) {
  //     return;
  //   }
  //
  //   if (currentEndpoint) {
  //     getApiInSeconds(chain, currentEndpoint)
  //       .then((api) => {
  //         const endpoint = api._options.provider.endpoint;
  //         setNowApi(api);
  //       })
  //       .catch(() => {
  //         if (endpoints.length > 1) {
  //           dispatch(removeCurrentNode()); // remove current node to trigger the best node selection
  //         }
  //       });
  //   } else {
  //     Promise.any(
  //       candidateNodes.map((endpoint) => getApi(chain, endpoint)),
  //     ).then((api) => {
  //       setNowApi(api);
  //       const endpoint = api._options.provider.endpoint;
  //       dispatch(setCurrentNode({ url: endpoint, saveLocalStorage: false }));
  //     });
  //   }
  // }, [currentEndpoint, chain, dispatch, endpoints, candidateNodes]);

  return <ApiContext.Provider value={null}>{children}</ApiContext.Provider>;
}

export function useContextApi() {
  return useContext(ApiContext);
}
