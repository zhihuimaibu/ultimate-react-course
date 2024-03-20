import { useSelector } from "react-redux";
import { getUserName } from "./userSlice";

function Username() {
  const userName = useSelector(getUserName);
  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
}

export default Username;
