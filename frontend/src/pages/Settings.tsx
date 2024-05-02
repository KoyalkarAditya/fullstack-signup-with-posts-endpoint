import { useNavigate } from "react-router-dom";
export function Settings() {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-center items-center shadow-xl h-60 w-60">
      <input type="text" placeholder="" />
    </div>
  );
}
