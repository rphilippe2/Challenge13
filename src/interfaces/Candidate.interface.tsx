export interface Candidate {
  login: string; // Username of the candidate (GitHub handle)
  name?: string; // Full name (optional since not all GitHub users have a name)
  location?: string; // Location (optional)
  avatar_url: string; // URL of the candidate's avatar image
  email?: string; // Email (optional)
  company?: string; // Company name (optional)
  html_url: string; // Link to the GitHub profile
}
