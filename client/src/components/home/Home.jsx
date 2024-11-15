import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LeaderboardCard from '../leaderboard/LeaderboardCard';
import Blogs from './components/Blogs';
import EventCarousel from './components/EventCarousel';
import { fetchBlogs } from '../../redux/features/blogs/blogsSlice';


const Events = [
  {
    title: "Ready to Code? Compete, Solve, and Conquer Challenges!",
    creator: "CodeMaster",
    date: "2024-11-04",
    content: [
      "Gear up for an adrenaline-packed experience as you face coding challenges from all around the world! This competition will test your coding prowess, speed, and creativity under pressure. Whether you’re here to hone your skills, challenge yourself, or aim for the top leaderboard spot, this is your chance to shine.",
      "Each challenge is designed to push your boundaries and encourage innovative problem-solving. Solutions will be evaluated based on efficiency, accuracy, and clarity, so bring your best coding practices. Are you ready to take on the competition?",
      "Stay tuned for live updates, and may the best coder win!"
    ],
    creatorInfo: {
      name: "CodeMaster",
      bio: "As an experienced developer and a fierce advocate for competitive programming, CodeMaster is here to inspire and challenge coders of all levels.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "Unleash Your Creativity with Coding Hackathons!",
    creator: "DevGuru",
    date: "2024-11-03",
    content: [
      "Join us for a series of exciting hackathons that will ignite your creativity! Put your skills to the test as you collaborate with others to build innovative projects.",
      "Whether you’re a beginner or a seasoned pro, there’s something for everyone. The goal is to learn, collaborate, and have fun while creating something amazing!",
      "Don’t miss this opportunity to network with like-minded individuals and showcase your talents!"
    ],
    creatorInfo: {
      name: "DevGuru",
      bio: "DevGuru is a passionate coder who loves sharing knowledge and helping others grow in the tech community.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "Mastering Algorithms: Your Path to Becoming a Coding Ninja!",
    creator: "AlgoExpert",
    date: "2024-11-02",
    content: [
      "Dive deep into the world of algorithms and data structures with our comprehensive guide! Mastering these concepts is essential for any coder looking to excel in competitive programming.",
      "We’ll cover everything from sorting algorithms to graph theory, providing you with the tools you need to tackle any coding challenge with confidence.",
      "Join us as we embark on this journey to becoming coding ninjas!"
    ],
    creatorInfo: {
      name: "AlgoExpert",
      bio: "AlgoExpert is a coding enthusiast and educator who loves breaking down complex topics into digestible lessons.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "The Future of Coding: Trends to Watch in 2025!",
    creator: "TechTrends",
    date: "2024-11-01",
    content: [
      "Stay ahead of the curve by exploring the latest trends in coding and technology! From AI advancements to the rise of no-code platforms, we’ll discuss what to expect in the coming years.",
      "Understanding these trends will not only enhance your skills but also prepare you for the future job market.",
      "Let’s navigate the evolving landscape of technology together!"
    ],
    creatorInfo: {
      name: "TechTrends",
      bio: "TechTrends is a tech enthusiast who enjoys exploring the latest innovations and sharing insights with others.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  }
];


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {blogs, status} = useSelector((state) => state.blogs);
  const index = useSelector((state) => state.event.event);
  console.log("home")
  console.log(blogs);
  console.log(index);
  console.log(status);

  useEffect(()=>{
      dispatch(fetchBlogs());
  },[]);

  if(status === "failed"){
    return (
      <p>Error while fetching the data</p>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-blue-100 flex justify-center p-4">
      <div className="grid gap-4 w-full max-w-screen-lg">
        
        
        <div className="hidden md:grid md:grid-cols-4 md:gap-4 w-full h-screen">
          <div
            className="col-span-3 h-full overflow-y-auto rounded p-4 hide-scrollbar"
            style={{
              backgroundImage: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
              color: 'white',
              overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}
          >
            {(status === "succeeded") && blogs[index] && (<Blogs blogs={blogs[index]} />)}
            {status !== "succeeded" && <p>Loading...</p>}
          </div>
          
          
          <div className="col-span-1 rounded p-4">
            <LeaderboardCard />
          </div>
        </div>

            {/* {mobile section} */}
        <div className="md:hidden grid gap-4 w-full">
          <div
            className="bg-gradient-to-r from-teal-400 to-purple-600 text-white rounded p-4"
          >
            {(status === "succeeded") && blogs[index] && (<Blogs blogs={blogs[index]} />)}
            {status !== "succeeded" && <p>Loading...</p>}
          </div>
          <div className="rounded">
            <LeaderboardCard />
          </div>
        </div>
      </div>
    </div>
    <div>
    <EventCarousel blogs={blogs}/>
  </div>
  </>
  );
};

export default Home;
