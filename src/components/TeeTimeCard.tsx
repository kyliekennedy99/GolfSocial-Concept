import React from "react";
import { TeeTime, User } from "../types";

interface Props {
  tee: TeeTime;
  users: User[];
  currentUserId: string;
  onToggleBooking: (teeId: string) => void;
  onOpenProfile: (userId: string) => void;
}

export default function TeeTimeCard({
  tee,
  users,
  currentUserId,
  onToggleBooking,
  onOpenProfile,
}: Props) {
  const formattedTime = new Date(tee.time).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const bookedUsers = users.filter((u) => tee.bookedBy.includes(u.id));
  const isBooked = tee.bookedBy.includes(currentUserId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 transition hover:shadow-xl hover:scale-[1.02] animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {tee.course}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{formattedTime}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {bookedUsers.map((player) => (
          <button
            key={player.id}
            onClick={() => onOpenProfile(player.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 hover:brightness-110 transition"
          >
            <span className="font-bold">
              {player.name
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
            {player.name}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <button
          onClick={() => onToggleBooking(tee.id)}
          className={`px-3 py-1 rounded-lg ${
            isBooked
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isBooked ? "Cancel" : "Book"}
        </button>
      </div>
    </div>
  );
}
