
'use server';

// In-memory notice board service using localStorage
// In a real application, this would be a database like Firestore.

export type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const NOTICES_KEY = 'noticesData';

// Function to get notices from localStorage
const getStoredNotices = (): Notice[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const data = localStorage.getItem(NOTICES_KEY);
  return data ? JSON.parse(data) : [];
};

// Function to save notices to localStorage
const storeNotices = (notices: Notice[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(NOTICES_KEY, JSON.stringify(notices));
  }
};

// Initialize with some mock data if empty
const initializeMockNotices = () => {
  const notices = getStoredNotices();
  if (notices.length === 0) {
    storeNotices([
      {
        id: '1',
        title: 'Welcome to the New Semester!',
        content: 'We are excited to welcome all new and returning students to the new semester. Please check your class schedules and be prepared for an amazing learning journey.',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Holiday for Diwali Festival',
        content: 'The institute will be closed for the Diwali festival. We wish everyone a happy and safe celebration.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);
  }
};

// Call initialize on module load
initializeMockNotices();


export async function getNotices(): Promise<Notice[]> {
  const notices = getStoredNotices();
  // Return notices sorted by most recent first
  return notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addNotice(data: { title: string; content: string }): Promise<Notice> {
  const notices = getStoredNotices();
  const newNotice: Notice = {
    id: new Date().getTime().toString(),
    title: data.title,
    content: data.content,
    createdAt: new Date().toISOString(),
  };
  const updatedNotices = [newNotice, ...notices];
  storeNotices(updatedNotices);
  return newNotice;
}

export async function updateNotice(noticeToUpdate: Notice): Promise<Notice> {
  let notices = getStoredNotices();
  notices = notices.map(notice =>
    notice.id === noticeToUpdate.id ? noticeToUpdate : notice
  );
  storeNotices(notices);
  return noticeToUpdate;
}

export async function deleteNotice(id: string): Promise<void> {
  let notices = getStoredNotices();
  notices = notices.filter(notice => notice.id !== id);
  storeNotices(notices);
}
