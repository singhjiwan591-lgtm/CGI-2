
'use client';

// In-memory notice board service using localStorage
// In a real application, this would be a database like Firestore.

export type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const getNoticesKey = (schoolId: string) => `noticesData_${schoolId}`;

// Function to get notices from localStorage
const getStoredNotices = (schoolId: string): Notice[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const data = localStorage.getItem(getNoticesKey(schoolId));
    const parsedData = data ? JSON.parse(data) : [];
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Failed to parse notices from localStorage", error);
    return [];
  }
};

// Function to save notices to localStorage
const storeNotices = (notices: Notice[], schoolId: string) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(getNoticesKey(schoolId), JSON.stringify(notices));
    } catch (error) {
      console.error("Failed to save notices to localStorage. Storage might be full.", error);
      alert("Could not save notice data. The browser storage may be full.");
    }
  }
};

const initializeMockNotices = (schoolId: string) => {
    const mockData = [
        {
          id: '1',
          title: `Welcome to the New Semester at ${schoolId === 'jalalabad' ? 'Jalalabad' : 'Golu Ka Mor'}!`,
          content: 'We are excited to welcome all new and returning students to the new semester. Please check your class schedules and be prepared for an amazing learning journey.',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Holiday for Diwali Festival',
          content: 'The institute will be closed for the Diwali festival. We wish everyone a happy and safe celebration.',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];
    storeNotices(mockData, schoolId);
    return mockData;
};


export function getNotices(schoolId: string): Notice[] {
  if (typeof window === 'undefined') return [];
  let notices = getStoredNotices(schoolId);
  if (notices.length === 0) {
      notices = initializeMockNotices(schoolId);
  }
  // Return notices sorted by most recent first
  return notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addNotice(data: { title: string; content: string }, schoolId: string): Notice {
  const notices = getNotices(schoolId);
  const newNotice: Notice = {
    id: new Date().getTime().toString(),
    title: data.title,
    content: data.content,
    createdAt: new Date().toISOString(),
  };
  const updatedNotices = [newNotice, ...notices];
  storeNotices(updatedNotices, schoolId);
  return newNotice;
}

export function updateNotice(noticeToUpdate: Notice, schoolId: string): Notice {
  let notices = getNotices(schoolId);
  notices = notices.map(notice =>
    notice.id === noticeToUpdate.id ? noticeToUpdate : notice
  );
  storeNotices(notices, schoolId);
  return noticeToUpdate;
}

export function deleteNotice(id: string, schoolId: string): void {
  let notices = getNotices(schoolId);
  notices = notices.filter(notice => notice.id !== id);
  storeNotices(notices, schoolId);
}
