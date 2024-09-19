export async function fetchDashboardData() {
  return {
    organization: 1,
    governmentSectors: 3,
    projects: 5,
    donations: 1000,
    members: 150,
    events: 10,
    recentActivities: [
      'New member joined',
      'Upcoming event: Friday Prayer',
      'Donation received: $100',
    ],
  }
}