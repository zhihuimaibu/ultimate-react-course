const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA"
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D"
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF"
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33"
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB"
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00"
  }
]



function Avatar() {
  return <img src="美美哒2.jpg" className="avatar" alt="mmm" />
}

function Intro() {
  return <div>
    <h1>sdfsdfsdfsf</h1>
    <p>
      Full-stack web developer and teacher at Udemy. When not coding or
      preparing a course, I like to play board games, to cook (and eat), or to
      just enjoy the Portuguese sun at the beach.
    </p>
  </div>
}

function SkillList() {
  return <ul className="skill-list">
    {
      skills.map(s => (
        <Skill key={s.skill} skill={s.skill} color={s.color} level={s.level} />
      ))
    }
  </ul>
}

function Skill({ skill, color, level }) {
  return <li className="skill" style={{ backgroundColor: color }}>
    <span>{skill}</span>
    <span>{level === 'advanced' && '✌️'}</span>
    <span>{level === 'intermediate' && '😒'}</span>
    <span>{level === 'beginner' && '🐙'}</span>
  </li>
}

export default function Resume() {
  return <div className="card">
    <Avatar />
    <div className="data">
      <Intro />
      <SkillList />
    </div>
  </div>
}