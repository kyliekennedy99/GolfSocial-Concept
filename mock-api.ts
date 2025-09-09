// src/mock-api.ts
import { User, TeeTime, Message } from './types'

const users: User[] = [
  { id: 'u1', name: 'Kylie K.', avatar: '', handicap: 12, bio: 'Loves early morning rounds' },
  { id: 'u2', name: 'Alex M.', avatar: '', handicap: 8, bio: 'Weekend warrior' },
  { id: 'u3', name: 'Taylor R.', avatar: '', handicap: 20, bio: 'New to golf' },
]

const teeTimes: TeeTime[] = [
  { id: 't1', time: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), course: 'Lakeside GC', bookedBy: ['u1'] },
  { id: 't2', time: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), course: 'Pine Ridge', bookedBy: ['u2', 'u3'] },
]

const messages: Message[] = [
  {
    id: 'm1',
    sender: 'u2',
    recipient: 'u1',
    text: 'Hey — want to pair up next Saturday?',
    sentAt: new Date().toISOString(),
  },
]

const courses = [
  { id: 'c1', name: 'Lakeside Golf Club', address: '123 Fairway Ln', lat: 40.7128, lng: -74.006 },
  { id: 'c2', name: 'Pine Ridge Golf', address: '456 Green St', lat: 40.7228, lng: -74.016 },
  { id: 'c3', name: 'Maple Valley', address: '789 Maple Rd', lat: 40.7328, lng: -74.026 },
]

export const api = {
  getUsers: async (): Promise<User[]> => structuredClone(users),

  getUserById: async (id: string): Promise<User | undefined> =>
    structuredClone(users.find(u => u.id === id)),

  getTeeTimes: async (): Promise<TeeTime[]> => structuredClone(teeTimes),

  bookTeeTime: async (teeId: string, userId: string): Promise<TeeTime> => {
    const t = teeTimes.find(t => t.id === teeId)
    if (!t) throw new Error('Not found')
    if (!t.bookedBy.includes(userId)) t.bookedBy.push(userId)
    return structuredClone(t)
  },

  unbookTeeTime: async (teeId: string, userId: string): Promise<TeeTime> => {
    const t = teeTimes.find(t => t.id === teeId)
    if (!t) throw new Error('Not found')
    t.bookedBy = t.bookedBy.filter(id => id !== userId)
    return structuredClone(t)
  },

  getMessages: async (): Promise<Message[]> => structuredClone(messages),

  sendMessage: async (msg: Pick<Message, 'sender' | 'recipient' | 'text'>): Promise<Message> => {
    const newMsg: Message = {
      ...msg,
      id: 'm' + Math.random().toString(36).slice(2, 9),
      sentAt: new Date().toISOString(),
    }
    messages.push(newMsg)
    return structuredClone(newMsg)
  },

  // ✅ New: Courses near me
  getCoursesNear: async (lat: number, lng: number): Promise<typeof courses> => {
    // Simple distance filter (50 km radius)
    return courses.filter(course => {
      const distance = getDistanceFromLatLonInKm(lat, lng, course.lat, course.lng)
      return distance <= 50
    })
  },
}

// Helper: Haversine formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}
