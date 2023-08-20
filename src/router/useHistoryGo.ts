import { useHistory } from "react-router-dom";
const useHistoryGo = ()=>{
  const history = useHistory()

    return async(key:string)=>{history.push(key)}

}

export default useHistoryGo