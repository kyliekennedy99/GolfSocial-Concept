// src/types.ts

export type User = {
  id: string;
  name: string;
  avatar?: string;
  handicap?: number;
  bio?: string;
};

export interface Player {
  id: string;
  name: string;
  initials: string;
}

export type TeeTime = {
  id: string;
  time: string; // ISO string
  course: string;
  bookedBy: string[]; // user ids
  players?: Player[]; // optional: populated when you expand bookedBy
};

export type Message = {
  id: string;
  sender: string; // instead of 'from'
  recipient: string; // instead of 'to'
  text: string;
  sentAt: string;
};
