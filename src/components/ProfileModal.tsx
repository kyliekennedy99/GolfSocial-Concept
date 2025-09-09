import React from 'react';
import { User } from '../types';

export default function ProfileModal({
  user,
  onClose,
  onMessage,
}: {
  user?: User | null;
  onClose: () => void;
  onMessage: (userId: string) => void;
}) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xl font-bold">
              {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.name[0]}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Handicap: {user.handicap ?? '—'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition text-2xl font-bold p-1"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{user.bio}</p>

        {/* Actions */}
        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={() => onMessage(user.id)}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 text-white rounded-lg font-medium transition shadow-sm"
          >
            Message
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
