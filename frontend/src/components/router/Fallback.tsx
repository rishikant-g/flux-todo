import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Fallback() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: "85vh"}}>
        <div className="text-center">
          <p className="text-center">
            We are sorry about this, please try again.
          </p>
          <Button variant="danger"
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </>
  );
}

export default Fallback;
