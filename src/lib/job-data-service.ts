
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
  return data ? JSON.parse(data) : [];
};

const storeJobs = (jobs: Job[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(getJobsKey(), JSON.stringify(jobs));
  }
};

const initializeMockJobs = () => {
  if (typeof window === 'undefined') return;
  const jobs = getStoredJobs();
  if (jobs.length === 0) {
    storeJobs([
      {
        id: '1',
        title: 'Punjab Police Constable Recruitment',
        description: 'Punjab Police has announced recruitment for 1800 constable posts. 12th pass candidates can apply. Last date: 30-08-2024.',
        photoURL: 'https://placehold.co/600x400.png',
        createdAt: new Date().toISOString(),
      },
       {
        id: '2',
        title: 'PSPCL Clerk Vacancy',
        description: 'Punjab State Power Corporation Ltd. invites applications for 500 clerk positions. Graduate candidates are eligible. Apply online before 15-09-2024.',
        photoURL: 'https://placehold.co/600x400.png',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);
  }
};

// Ensure initialization happens on the client
if (typeof window !== 'undefined') {
    initializeMockJobs();
}


export function getJobs(): Job[] {
  const jobs = getStoredJobs();
  return jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addJob(data: Omit<Job, 'id' | 'createdAt'>): Job {
  if (typeof window === 'undefined') throw new Error("Local storage not available");
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
  if (typeof window === 'undefined') throw new Error("Local storage not available");
  let jobs = getJobs();
  jobs = jobs.map(job =>
    job.id === jobToUpdate.id ? jobToUpdate : job
  );
  storeJobs(jobs);
  return jobToUpdate;
}

export function deleteJob(id: string): void {
  if (typeof window === 'undefined') throw new Error("Local storage not available");
  let jobs = getJobs();
  jobs = jobs.filter(job => job.id !== id);
  storeJobs(jobs);
}
