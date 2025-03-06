export interface TDashboardAnalytics {
  jobApplication: {
    totalApplications: number;
    totalPending: number;
    totalShortlisted: number;
  };
  user: {
    totalUsers: number;
    totalActiveUsers: number;
    totalInactiveUsers: number;
  };
  review: {
    totalReviews: number;
    totalPendingReviews: number;
    totalApprovedReviews: number;
    avgStarRating: number;
  };
  query: {
    totalQueries: number;
    totalNew: number;
    totalResolved: number;
    totalPending: number;
    avgResponseTime: number;
  };
  hiringStats: {
    totalHiringPosts: number;
    openPositions: number;
  };
  applicantsPerPosition: unknown[]; // Update if there's a defined structure
  blog: {
    totalBlogs: number;
  };
}
