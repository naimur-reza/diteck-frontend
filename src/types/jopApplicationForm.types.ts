export type WorkExperience = {
  company: string;
  role: string;
  duration: string;
};

export type ApplicationFormData = {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeLink: string;
  linkedInProfile: string;
  facebookProfile: string;
  portfolioLink: string;
  githubProfile: string;
  expectedSalary: number;
  currency: string;
  currentCompany: string;
  availableByDate: string;
  education: string;
  skills: { value: string }[];
  workExperience: WorkExperience[];
  preferredWorkingHours: string;
  applicationSource: string;
  reasonWeHireYou: string;
  coverLetter: string;
};
