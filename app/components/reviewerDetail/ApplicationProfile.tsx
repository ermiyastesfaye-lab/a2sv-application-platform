const ApplicationProfile = () => {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Applicant Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School
            </label>
            <p className="text-gray-900">Addis Ababa Institute of Technology</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree Program
            </label>
            <p className="text-gray-900">Software Engineering</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coding Profiles
            </label>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Github
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                LeetCode
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Codeforces
              </a>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Essay 1: Tell us about your self?
            </label>
            <p className="text-gray-900">
              I am passionate about solving complex problems.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Essay 2: Why do you want to join us?
            </label>
            <p className="text-gray-900">
              I want to join Revaverse. I am sure it will help me to improve my
              problem solving skill.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
              View Resume.pdf
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
