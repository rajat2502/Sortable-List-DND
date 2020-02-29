import React, { useState, useEffect } from "react";

const SkillCol = ({
  skills,
  setSkillArray,
  start,
  end,
  onDragStart,
  onDragOver,
  onDragEnd,
  removeItem
}) => {
  const [items, setitems] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow"
    )
      .then(res => res.json())
      .then(res => {
        let items = res.items.map(item => item.name);
        setitems(items);
      })
      .catch(err => console.log(err));
  }, []);

  const addSkill = (e, index) => {
    if (e.target.firstChild.value) {
      let items = skills;
      items[index] = e.target.firstChild.value;
      setSkillArray(items);
      e.target.firstChild.value = "";
    }
    e.preventDefault();
  };

  return (
    <div className="col">
      {skills.slice(start, end).map((skill, index) => {
        if (skill !== "") {
          return (
            <div
              key={index}
              className="skill-box"
              draggable={true}
              onDragStart={e => onDragStart(e, skills.indexOf(skill))}
              onDragOver={e => onDragOver(skills.indexOf(skill))}
              onDragEnd={onDragEnd}
            >
              <span>
                {skills.indexOf(skill) + 1}.
              </span>
              <span className="skill-name">
                {skill}
              </span>
              <span
                className="close"
                onClick={e => removeItem(skills.indexOf(skill))}
              >
                &#10006;
              </span>
            </div>
          );
        } else {
          return (
            <div key={index} className="skill-input">
              <form onSubmit={e => addSkill(e, skills.indexOf(skill))}>
                <input
                  list="skills"
                  name="skill-list"
                  placeholder="Add Skill"
                  className="input-box"
                />
                <datalist id="skills">
                  {items.map((item, index) => {
                    return <option value={item} key={index} />;
                  })}
                </datalist>
              </form>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SkillCol;
