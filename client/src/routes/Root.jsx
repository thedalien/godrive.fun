import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Header />
        <div id="detail">
            <Outlet />
        </div>
    </>
  )
}

export default Root;