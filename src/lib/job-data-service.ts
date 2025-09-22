
'use client';

// In-memory data store for jobs that persists in localStorage

export type Job = {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  createdAt: string;
};

const getJobsKey = () => `govtJobsData`;

const getStoredJobs = (): Job[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const data = localStorage.getItem(getJobsKey());
  try {
      const parsedData = data ? JSON.parse(data) : [];
      return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
      console.error("Failed to parse jobs from localStorage", error);
      return [];
  }
};

const storeJobs = (jobs: Job[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(getJobsKey(), JSON.stringify(jobs));
  }
};

export function getJobs(): Job[] {
  if (typeof window === 'undefined') return [];
  const jobs = getStoredJobs();
  return jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addJob(data: Omit<Job, 'id' | 'createdAt'>): Job {
  const jobs = getJobs();
  const newJob: Job = {
    id: new Date().getTime().toString(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  const updatedJobs = [newJob, ...jobs];
  storeJobs(updatedJobs);
  return newJob;
}

export function updateJob(jobToUpdate: Job): Job {
  let jobs = getJobs();
  jobs = jobs.map(job =>
    job.id === jobToUpdate.id ? jobToUpdate : job
  );
  storeJobs(jobs);
  return jobToUpdate;
}

export function deleteJob(id: string): void {
  let jobs = getJobs();
  jobs = jobs.filter(job => job.id !== id);
  storeJobs(jobs);
}
