import React from 'react'
import { User } from '../types'


export default function Avatar({ user, size = 10 }: { user: User, size?: number }){
const initials = user.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()
return (
<div className={`w-${size} h-${size} rounded-full bg-green-200 flex items-center justify-center text-sm font-semibold`}>
{user.avatar ? <img src={user.avatar} className="w-full h-full object-cover rounded-full"/> : initials}
</div>
)
}
