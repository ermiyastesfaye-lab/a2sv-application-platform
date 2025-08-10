interface ApplicantDetails {
  id: string;
  applicant_name: string;
  status: string;
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
}

interface ApplicationProfileProps {
  applicantDetails: ApplicantDetails;
}

const ApplicationProfile = ({ applicantDetails }: ApplicationProfileProps) => {
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
            <p className="text-gray-900">{applicantDetails.school}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree Program
            </label>
            <p className="text-gray-900">{applicantDetails.degree}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coding Profiles
            </label>
            <div className="flex space-x-4">
              <a
                href={`https://leetcode.com/${applicantDetails.leetcode_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                LeetCode: {applicantDetails.leetcode_handle}
              </a>
              <a
                href={`https://codeforces.com/profile/${applicantDetails.codeforces_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Codeforces: {applicantDetails.codeforces_handle}
              </a>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Essay 1: Tell us about yourself?
            </label>
            <p className="text-gray-900 whitespace-pre-wrap">
              {applicantDetails.essay_about_you}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Essay 2: Why do you want to join A2SV?
            </label>
            <p className="text-gray-900 whitespace-pre-wrap">
              {applicantDetails.essay_why_a2sv}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume
            </label>
            <a
              href={applicantDetails.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View Resume.pdf
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
