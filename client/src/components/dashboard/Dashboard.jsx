import React from 'react';
import { AboutUser, AuraScore, LastEventCard, StatisticsCard } from './cards/index.js';
import Course_Events from './courseAndEvents/Course_Events.jsx';

const user = {
  name: 'John Doe',
  username: 'johndoe@aura',
  bio: 'A passionate web developer and tech enthusiast.',
  profilePicture: 'https://via.placeholder.com/150',
  aura: 777,
};

const events = [
  { name: 'Event One', date: '2024-11-01', score: 90 },
  { name: 'Event Two', date: '2024-10-25', score: 75 },
  { name: 'Event Three', date: '2024-10-15', score: 85 },
];

const stats = {
  accomplished: 15,
  total: 20,
  ratedTasks: 10,
  selfTasks: 5,
  highestRank: 3,
};

const Dashboard = () => {
  return (
    <>
      <div className="flex bg-blue-100">
        <div className="flex-grow flex flex-col items-center justify-center overflow-y-auto px-8">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl bg-blue-100 p-6 rounded-lg shadow-lg">
              <AboutUser user={user} />
              <AuraScore score={user.aura} />
              <LastEventCard events={events} />
              <StatisticsCard stats={stats} />
            </div>
            <div className="w-full max-w-4xl h-px bg-gray-400 my-6" />
            <Course_Events />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;