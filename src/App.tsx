import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { api } from './mock-api';
import { User, TeeTime } from './types';
import TeeTimeCard from './components/TeeTimeCard';
import ProfileModal from './components/ProfileModal';
import MessagesPanel from './components/MessagesPanel';
import Header from './components/Header';
import CoursesNearMe from './components/CoursesNearMe';
import Messages from './components/Messages';
import CoursesPage from './pages/Courses';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
  const [profileOpen, setProfileOpen] = useState<User | null>(null);
  const currentUserId = 'u1'; // pretend logged-in

  useEffect(() => {
    async function load() {
      const [u, t] = await Promise.all([api.getUsers(), api.getTeeTimes()]);
      setUsers(u);
      setTeeTimes(t);
    }
    load();
  }, []);

  const toggleBooking = async (teeId: string) => {
    const tee = teeTimes.find((t) => t.id === teeId);
    if (!tee) return;
    if (tee.bookedBy.includes(currentUserId)) {
      await api.unbookTeeTime(teeId, currentUserId);
    } else {
      await api.bookTeeTime(teeId, currentUserId);
    }
    const updated = await api.getTeeTimes();
    setTeeTimes(updated);
  };

  const openProfile = async (userId: string) => {
    const u = await api.getUserById(userId);
    setProfileOpen(u || null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-4">
              <section className="md:col-span-2 space-y-4">
                {teeTimes.map((tee) => (
                  <TeeTimeCard
                    key={tee.id}
                    tee={tee}
                    users={users}
                    onToggleBooking={toggleBooking}
                    currentUserId={currentUserId}
                    onOpenProfile={openProfile}
                  />
                ))}
                <CoursesNearMe />
              </section>

              <aside className="space-y-6 w-72 flex-shrink-0">
                <div className="sticky top-4">
                  <MessagesPanel currentUserId={currentUserId} />
                </div>

                <div className="p-4 bg-white rounded-xl shadow-md">
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">
                    Profiles
                  </h4>
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => openProfile(u.id)}
                        className="flex items-center gap-3 w-full p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                          {u.name
                            .split(' ')
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase()}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-medium text-gray-900 truncate">
                            {u.name}
                          </span>
                          <span className="text-xs text-gray-500 truncate">{u.bio}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </main>
          }
        />

        <Route path="/courses" element={<CoursesPage />} />
        <Route
          path="/tees"
          element={
            <div className="max-w-6xl mx-auto p-6 mt-4">
              {teeTimes.map((tee) => (
                <TeeTimeCard
                  key={tee.id}
                  tee={tee}
                  users={users}
                  onToggleBooking={toggleBooking}
                  currentUserId={currentUserId}
                  onOpenProfile={openProfile}
                />
              ))}
            </div>
          }
        />
        <Route
          path="/messages"
          element={<Messages currentUserId={currentUserId} />}
        />
      </Routes>

      <ProfileModal
        user={profileOpen}
        onClose={() => setProfileOpen(null)}
        onMessage={(id) => {
          setProfileOpen(null);
          alert('Open messaging with ' + id);
        }}
      />
    </div>
  );
}
