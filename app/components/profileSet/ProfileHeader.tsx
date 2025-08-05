import profileCoverImage from "@/public/profile-set-cover-img.jpg";
import profileAvatarImage from "@/public/profile-set-avatar-img.jpg";


const ProfileHeader = () => {
  return (
    <div className="relative w-full mb-6">
      {/* Cover Image */}
      <div
        className="w-full h-48 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${profileCoverImage.src})` }}
      ></div>

      {/* Avatar and User Info Container */}
      <div className="relative px-6">
        {/* Avatar positioned to overlap cover image */}
        <div className="absolute -top-16 left-6">
          <img
            src={profileAvatarImage.src}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* User Details positioned below and to the right of the avatar */}
        <div className="pb-5 pt-2 pl-36">
          <h1 className="text-2xl font-semibold text-gray-900">Abebe Kebede</h1>
          <p className="text-gray-600">abe@a2sv.org</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
