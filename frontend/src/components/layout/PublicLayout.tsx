import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="mx-container pre-login">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
