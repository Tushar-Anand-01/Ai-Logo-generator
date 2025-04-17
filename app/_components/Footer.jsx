"use client";

import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";

const contributors = [
  {
    name: "Praveen Singh",
    github: "https://github.com/Praveen-kumar1Singh",
    linkedin: "https://www.linkedin.com/in/praveenkumarsingh39",
    // instagram: "https://instagram.com/praveenksingh",
  },
  {
    name: "Anubhuti",
    github: "http://www.linkedin.com/in/anubhuti-chandra-46097530a",
    linkedin: "https://github.com/anubhuti02",
  },
  {
    name: "Komal",
    github: "https://github.com/Komal25252",
    linkedin: "http://www.linkedin.com/in/komal-mishra-6a6388262",
  },
  {
    name: "Tushar",
    github: "https://github.com/Tushar-Anand-01",
    linkedin: "https://www.linkedin.com/in/tushar-anand-33205a252/",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-300 dark:border-gray-700">
      <div className="text-center text-gray-800 dark:text-gray-300">
        <h2 className="text-lg font-semibold mb-4">Contributors</h2>

        <ul className="flex flex-wrap justify-center gap-8 text-sm">
          {contributors.map((person, index) => (
            <li key={index} className="text-center">
              <p className="font-medium">{person.name}</p>
              <div className="flex justify-center gap-3 mt-1 text-lg">
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
{/*                 {person.instagram && (
                  <a
                    href={person.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                )} */}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-sm flex flex-col items-center">
          <p className="flex items-center gap-2">
            Made with <FaHeart className="text-blue-500" /> by <strong>BlueCode Team</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-400">All Right Reserved || &copy; {year}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
