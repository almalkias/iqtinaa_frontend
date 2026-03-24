import PersonalInfo from "../PersonalInfo";
import EmailChange from "../EmailChange";
import PasswordChange from "../PasswordChange";
import ProfileImage from "../ProfileImage";
import "./AccountSettings.css";

function AccountSettings() {
  return (
    <div className='account-settings'>
      <ProfileImage showText={true} />
      <hr />
      <PersonalInfo />
      <hr />
      <EmailChange />
      <hr />
      <PasswordChange />
    </div>
  )
}

export default AccountSettings;
