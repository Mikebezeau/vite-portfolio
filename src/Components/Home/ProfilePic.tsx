import profilePic from "/user-image.png";

function ProfilePic() {
  return (
    <div className="fixed">
      <img src={profilePic} className="h-screen object-cover w-screen" />
    </div>
  );
}

export default ProfilePic;
