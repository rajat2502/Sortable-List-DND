import React, { useEffect } from "react";

import { useState } from "react";
import SkillCol from "./Components/SkillCol";

let draggedItem;

const App = () => {
  const [skills, setskills] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow"
    )
      .then(res => res.json())
      .then(res => {
        let items = res.items.map(item => item.name);
        setskills(items.slice(0, 10));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(
    () => {
      // save to firebase
    },
    [skills]
  );

  const onDragStart = (e, index) => {
    draggedItem = skills[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const onDragOver = index => {
    const draggedOverItem = skills[index];
    if (draggedItem === draggedOverItem) {
      return;
    }
    let items = skills.filter(item => item !== draggedItem);
    items.splice(index, 0, draggedItem);
    setskills(items);
  };

  const removeItem = index => {
    let items = skills.filter(item => item !== skills[index]);
    items.push("");
    setskills(items);
  };

  const setSkillArray = arr => {
    setskills(arr);
    removeItem(-1);
  };

  return (
    <div className="main">
      <ul>
        <li>Things you're good at!</li>
      </ul>
      <div className="skills-box">
        <p className="heading">
          The skills you mention will help hackathon organizers in assuming you
          as a potential participant.
        </p>
        <div className="skills row">
          <SkillCol
            skills={skills}
            setSkillArray={setSkillArray}
            start={0}
            end={5}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            removeItem={removeItem}
          />
          <SkillCol
            skills={skills}
            setSkillArray={setSkillArray}
            start={5}
            end={10}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            removeItem={removeItem}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
