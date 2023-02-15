"use client";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    function createRandomUser() {
      return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      };
    }

    Array.from({ length: 3 }).forEach(() => {
      suggestions.push(createRandomUser());
    });

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5">
        <h3 className="text-gray-500 font-semibold text-sm">
          Suggestions for you
        </h3>
        <button className="hover:text-gray-500 font-semibold text-xs">
          See All
        </button>
      </div>

      {suggestions.map((profile) => (
        <div
          className="flex items-center justify-between mt-3"
          key={profile.id}
        >
          <img
            className="w-10 h-10 rounded-full border p-[0.5px]"
            src={profile.avatar}
            alt=""
          />

          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-gray-500 text-xs">Suggestions for you</h3>
          </div>

          <button className="font-semibold text-blue-500 text-xs">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
