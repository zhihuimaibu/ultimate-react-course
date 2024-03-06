import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={() => {
        navigate(-1);
      }}
    >
      back
    </Button>
  );
}

export default BackButton;
