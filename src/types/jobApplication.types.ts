export interface TJobApplication {
    _id: string
    jobId: string
    applicantName: string
    applicantEmail: string
    applicantPhone: string
    resumeLink: string
    linkedInProfile: string
    facebookProfile: string
    portfolioLink: string
    githubProfile: string
    expectedSalary: number
    currency: string
    currentCompany: string
    availableByDate: string
    education: string
    skills: string[]
    workExperience: WorkExperience[]
    preferredWorkingHours: string
    applicationSource: string
    reasonWeHireYou: string
    coverLetter: string
    status: string
    submissionDate: string
    applicationScore: number
    isDeleted: boolean
  }
  
  export interface WorkExperience {
    company: string
    role: string
    duration: string
  }
  