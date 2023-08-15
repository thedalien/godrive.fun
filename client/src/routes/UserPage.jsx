import "./css/User.css";

export default function UserPage() {
  return (
    <div id="user">
      <div id="userEdit">
        <h1>Hello {/* Username */}</h1>
        <h3>Current Details</h3>
        <div id="detailContainer">
          <div className="currentDetail">
            Current E-Mail: {/* User E-Mail Adress */}
          </div>
          <div className="userDetail">
            Lorem ipsum dolor sit amet consectetur
          </div>
          <div className="currentDetail">
            Current Password: {/* User Password */}
          </div>
          <div className="userDetail">
            Lorem ipsum dolor sit amet consectetur
          </div>
        </div>
{/*         <form >
          <label>Current E-Mail</label>
          <input type="text" name="updateMail" disabled/>
          <label>Current Password</label>
          <input type="text" name="updatePw" disabled />
        </form>
*/}
      </div>
      <div id="userRes">
        Your current reservations
      </div>
      <div id="userPrevRes">
        Your previous reservations
      </div>
    </div>
  )
}
