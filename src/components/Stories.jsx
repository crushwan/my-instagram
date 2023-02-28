// "use client";
// import { faker } from "@faker-js/faker";
// import { useEffect, useState } from "react";
import Story from "./Story";
import suggestions from "@/../Stories.json";

function Stories() {
  // const [suggestions, setSuggestions] = useState([]);

  // function createRandomUser() {
  //   return {
  //     userId: faker.datatype.uuid(),
  //     username: faker.internet.userName(),
  //     avatar: faker.image.avatar(),
  //   };
  // }

  // useEffect(() => {
  //   Array.from({ length: 10 }).forEach(() => {
  //     suggestions.push(createRandomUser());
  //   });

  //   setSuggestions(suggestions);
  // }, []);

  return (
    <div className="flex space-x-4 p-6 overflow-x-scroll scrollbar-hide">
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
