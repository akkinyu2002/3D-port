export const portfolioData = {
  name: "Aakash Neupane",
  title: "Graphic Designer & Frontend Developer",
  tagline:
    "Creative and adaptable individual with skills in graphic design, video editing, and content creation. Passionate about technology, cybersecurity, and innovative digital media projects.",
  about: {
    heading: "About Me",
    description:
      "I am a dedicated professional with a background in IT and a Diploma in Computer Engineering. My journey includes hands-on experience in graphic design, front-end development, and video editing. I have completed OJT at Panil Tech and Saraswati Secondary School, gaining real-world skills in web and mobile application development.",
    highlights: [
      "Diploma in Computer Engineering",
      "OJT at Panil Tech",
      "OJT at Saraswati Secondary School",
      "Web & Mobile App Development",
    ],
  },
  skills: [
    { name: "Graphic Design", icon: "\u{1F3A8}", level: 90 },
    { name: "Frontend Dev", icon: "\u{1F4BB}", level: 85 },
    { name: "Video Editing", icon: "\u{1F3AC}", level: 80 },
    { name: "Content Creation", icon: "\u270D\uFE0F", level: 85 },
    { name: "Cybersecurity", icon: "\u{1F510}", level: 70 },
    { name: "Mobile Dev", icon: "\u{1F4F1}", level: 75 },
  ],
  projects: [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "Designed, developed, and hosted my own personal portfolio website showcasing my skills and work.",
      tags: ["HTML", "CSS", "JavaScript", "Web Design"],
      color: "#00d4ff",
    },
    {
      id: 2,
      title: "Hostel Mess Management",
      description:
        "Mobile and Windows application for managing hostel mess operations using Visual Studio & Android Studio.",
      tags: ["Android Studio", "Visual Studio", "C#", "Java"],
      color: "#7b61ff",
    },
    {
      id: 3,
      title: "Graphic Design Portfolio",
      description:
        "Diverse graphic design projects including logos, posters, and social media visuals.",
      tags: ["Photoshop", "Illustrator", "Branding", "UI Design"],
      color: "#ff6b9d",
    },
  ],
  contact: {
    phone: "+977 9860212330",
    email: "neupaneaakash11@gmail.com",
    location: "Satyawati-6, Johang, Gulmi, Nepal",
    availability:
      "Currently available for freelance work or full-time opportunities.",
    cta: "Let's build something amazing together.",
  },
  resumeUrl:
    "https://www.neupaneaakash.com.np/assets/Aakash%20Neupane%20CV.pdf",
  socialLinks: {
    website: "https://www.neupaneaakash.com.np/",
  },
};

// AI assistant knowledge base used for contextual responses.
export const aiKnowledge = {
  greetings: [
    `Hello! I'm Aakash's AI assistant. I can tell you about his projects, skills, background, or how to get in touch. What would you like to know?`,
    `Welcome to Aakash Neupane's digital portfolio. Ask me anything about his work, skills, or experience!`,
  ],
  responses: {
    skills: `Aakash is a multi-talented professional with expertise in:\n\n- **Graphic Design** - Logos, posters, social media visuals, branding\n- **Frontend Development** - HTML, CSS, JavaScript, React\n- **Video Editing** - Professional video production and editing\n- **Content Creation** - Digital content for various platforms\n- **Cybersecurity** - Passionate about security and ethical hacking\n- **Mobile Development** - Android and Windows applications`,

    projects: `Aakash has worked on several impressive projects:\n\n1. **Portfolio Website** - Designed, developed, and self-hosted a personal portfolio showcasing his skills and work.\n\n2. **Hostel Mess Management** - A cross-platform application (mobile and Windows) for managing hostel mess operations, built with Visual Studio and Android Studio.\n\n3. **Graphic Design Portfolio** - A diverse collection of design work including logos, posters, and social media visuals for various clients.`,

    about: `Aakash Neupane is a **Graphic Designer & Frontend Developer** from Gulmi, Nepal. He holds a **Diploma in Computer Engineering** and has gained real-world experience through OJT at **Panil Tech** and **Saraswati Secondary School**.\n\nHe's passionate about technology, cybersecurity, and innovative digital media projects. His journey spans graphic design, front-end development, video editing, and mobile app development.`,

    contact: `You can reach Aakash through:\n\n**Phone:** +977 9860212330\n**Email:** neupaneaakash11@gmail.com\n**Location:** Satyawati-6, Johang, Gulmi, Nepal\n\nHe's currently available for freelance work or full-time opportunities!`,

    education: `Aakash holds a **Diploma in Computer Engineering**. He completed on-the-job training (OJT) at:\n\n- **Panil Tech** - Web and mobile application development\n- **Saraswati Secondary School** - Practical IT skills and development`,

    hire: `Aakash is currently **available for hire**! He's open to both freelance projects and full-time opportunities.\n\nHis strengths include graphic design, frontend development, video editing, and mobile app development.\n\nReach out at: neupaneaakash11@gmail.com\nOr call: +977 9860212330`,

    fallback: `I can help you learn about Aakash's:\n- **Skills** - "What are his skills?"\n- **Projects** - "Tell me about his projects"\n- **Background** - "Who is Aakash?"\n- **Contact** - "How to contact him?"\n- **Education** - "What's his education?"\n- **Hire** - "Is he available for work?"`,
  },
  keywords: {
    skills: [
      "skill",
      "abilities",
      "expertise",
      "capable",
      "technology",
      "tech",
      "good at",
      "know",
    ],
    projects: [
      "project",
      "work",
      "portfolio",
      "built",
      "created",
      "made",
      "develop",
    ],
    about: [
      "about",
      "who",
      "background",
      "bio",
      "story",
      "himself",
      "aakash",
      "tell me",
    ],
    contact: [
      "contact",
      "reach",
      "email",
      "phone",
      "call",
      "message",
      "connect",
      "touch",
    ],
    education: [
      "education",
      "study",
      "degree",
      "diploma",
      "college",
      "school",
      "qualification",
      "ojt",
    ],
    hire: [
      "hire",
      "available",
      "freelance",
      "job",
      "opportunity",
      "work with",
      "employ",
    ],
  },
};
