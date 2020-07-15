import { initialize, setListener } from './firebase';

export const mockMessages = [
  {
    incoming: true,
    message: 'Hi Vladimir',
  },
  {
    incoming: false,
    message: 'Hi, John',
  },
  {
    incoming: true,
    message: 'When we will learn real data fetching',
  },
  {
    incoming: false,
    message:
      "First we need to learn debugging and testing, then we will learn styling and animations and then we will learn real data fetching. Let's use this mock data for now ok?",
  },
];

// eslint-disable-next-line max-len
export const getMockData = () => new Promise((resolve) => setTimeout(() => resolve(mockMessages), 1000));

export const initApi = () => initialize();

export const getMessages = (updaterFn) => setListener('messages', updaterFn);
