
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
  const data = localStorage.getItem(getNoticesKey(schoolId));
  try {
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
    localStorage.setItem(getNoticesKey(schoolId), JSON.stringify(notices));
  }
};

export function getNotices(schoolId: string): Notice[] {
  if (typeof window === 'undefined') return [];
  const notices = getStoredNotices(schoolId);
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
