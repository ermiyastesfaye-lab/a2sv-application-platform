import Input from "./Input";

const InfoForm = () => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Personal Information
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full name
          </label>
          <Input type="text" id="fullName" defaultValue="Abebe Kebede" />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <Input type="email" id="email" defaultValue="abe@a2sv.org" />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <Input
            type="text"
            id="role"
            defaultValue="Applicant"
            disabled
            className="w-full px-3 py-1 border border-gray-100 rounded-xl text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 bg-gray-50 text-black">
        <button className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg font-medium transition-colors cursor-pointer hover:bg-[#4338ca]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default InfoForm;
