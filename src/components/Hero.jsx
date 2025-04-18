"use client"; // for Next.js
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [greeting, setGreeting] = useState("");
  const [isRoleTyping, setIsRoleTyping] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const fullGreeting = "Hi, I'm Raymond";
  const roleIntro = "I'm a";
  const roles = ["Programmer", "Developer", "Computer Engineer"];
  
  // Static greeting fade in effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setGreeting(fullGreeting);
      setIsRoleTyping(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Role typing effect with backspace
  useEffect(() => {
    if (!isRoleTyping) return;
    
    const currentRole = roles[roleIndex];
    
    // Typing forward
    if (roleText.length < currentRole.length && !roleText.endsWith("\b")) {
      const timeout = setTimeout(() => {
        setRoleText(roleText + currentRole[roleText.length]);
      }, 100);
      return () => clearTimeout(timeout);
    } 
    // Pause at the end of typing a word
    else if (roleText === currentRole) {
      const timeout = setTimeout(() => {
        setRoleText(roleText + "\b");
      }, 1500);
      return () => clearTimeout(timeout);
    } 
    // Backspacing
    else if (roleText.endsWith("\b")) {
      if (roleText.length > 1) {
        const timeout = setTimeout(() => {
          setRoleText(roleText.slice(0, -2) + "\b");
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Move to next role when backspacing is complete
        const nextRoleIndex = (roleIndex + 1) % roles.length;
        setRoleIndex(nextRoleIndex);
        setRoleText("");
      }
    }
  }, [roleText, roleIndex, isRoleTyping]);

  // Clean the backspace character for display
  const displayRole = roleText.replace("\b", "");

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-black to-gray flex items-center justify-center text-center text-white">
      <div className="absolute top-1/2 transform -translate-y-1/2 px-4">
        {/* Fade in greeting */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: greeting ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          {greeting}
        </motion.h1>

        {/* Role intro and typewriter effect */}
        <motion.div
          className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl flex justify-center items-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: greeting ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="mr-2">{roleIntro}</span>
          <span className="font-semibold text-blue-300">{displayRole}</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block ml-1 w-1 h-6 sm:h-8 md:h-10 bg-white"
          />
        </motion.div>
      </div>
    </section>
  );
}