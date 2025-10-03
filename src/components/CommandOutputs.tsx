'use client';

export const commandOutputs: Record<string, string> = {
  help: `Available commands:
  about      - About me
  skills     - Technical skills
  projects   - My projects
  experience - Work experience
  education  - Educational background
  certs      - Certifications
  contact    - Contact information
  resume     - Download resume
  clear      - Clear terminal
  matrix     - Enable Matrix mode
  sudo       - Enable admin mode
  whoami     - Current user
  date       - Current date/time
  ls         - List files
  pwd        - Print working directory`,
    
  about: `Hi, I'm Anshul Tiwari 
Full Stack Developer | Frontend Specialist | AI Enthusiast
Currently @ Thema Labs — Building interactive fintech dashboards
Passionate about creating seamless user experiences and exploring the intersection of AI and Web3.

I specialize in React, TypeScript, and modern web technologies, with a focus on building scalable applications that solve real-world problems.`,
    
  skills: `Technical Skills:

Frontend:
  • React.js, Next.js, TypeScript, JavaScript
  • Tailwind CSS, Shadcn, Chakra UI, AntD
  • Redux, React Query, Webpack, Jest
  • Framer Motion, HTML, CSS

Backend:
  • Node.js, Express.js, Fastify
  • Go (Gin, Fiber), Django

Database & Cloud:
  • PostgreSQL, MongoDB, SQL, NoSQL
  • AWS, Docker, CI/CD (GitHub Actions)

Languages:
  • JavaScript, TypeScript, Python, Go, C++`,
    
  projects: `Featured Projects:

1. YouTube Data DAO - Vana Academy
   • Built a Vana-based Data DAO for YouTube watch history
   • Chrome Extension + UI dashboard for data export
   • React.js, Shadcn, Tailwind CSS, VANA, Solidity
   • Python-based preprocessing scripts for AI model training
   Github: https://github.com/anshultiwari95/reddotdao
   Live: https://reddotdao.vercel.app/   

2. HackaRag – Hackathon Idea Evaluator
   • Built an AI-powered evaluator that scores hackathon ideas and maps them to relevant sponsor bounties.
   • Multi-agent LangGraph pipeline with 12 evaluation metrics (novelty, feasibility, scalability, UX value).
   • FAISS-based semantic search with event, sponsor, and bounty-level filtering.
   • Real-time feedback dashboard built in Streamlit with LLM-powered scoring.
   • SQLite + JSON ingestion system for multi-hackathon dataset persistence.
   • Dockerized and deployable on Fluence decentralized compute.
   Github: https://github.com/garg-prashant/hackarag

3. AI Mock Interviewer
   • Full-stack AI-driven mock interview application
   • Real-time questions using Gemini AI
   • Video/microphone recording with speech-to-text
   • Next.js, ClerkJs, Drizzle ORM, PostgreSQL
   Github: https://github.com/anshultiwari95/AI-Mock-Interviewer
   Live: https://ai-mock-interviewer.vercel.app/

4. Pulze Website
   • Scalable meeting-sharing tool with screen recording
   • Video creation, editing, annotation, and sharing
   • Next.js, Prisma, Node.js, MongoDB, AWS, WebRTC
   Github: https://github.com/anshultiwari95/Pulze
   Live: https://pulze.vercel.app/

5. Product Showcase Website
• Dynamic product landing page with carousel and product filters
• Built using styled-components and Framer Motion for animations
• React.js, Vite, Styled Components
Github: https://github.com/anshultiwari95/Product-Showcase-Frontend
Live: https://product-showcase-frontend.vercel.app/

6. Connectly - Client Communication App
• Frontend for a real-time communication tool for client interaction
• Secure login, state-managed chat interface
• React.js, Redux, Tailwind CSS
Github: https://github.com/anshultiwari95/ConnectlyFrontEnd
Live: https://connectly-front-end.vercel.app/login

7. Real Estate Website
• Property listings with search, filters, and agent profiles
• Fully responsive and designed for high usability
• React.js, Tailwind CSS
Github: https://github.com/anshultiwari95/RealEstateWebsiteFrontend
Live: https://real-estate-website-frontend-rho.vercel.app/

8. Dice Game
• Interactive game where players guess the outcome of a dice roll
• Earn points on correct guess, lose points on wrong guess
• React.js, Vite, Styled Components
Github: https://github.com/anshultiwari95/DiceGame
Live: https://dice-game-one-indol.vercel.app/`,

    
  experience: `Work Experience:

Frontend Developer @ Thema Labs (01/2024 - Present)
• Built interactive, real-time data portfolio dashboards using React, TypeScript, and Tailwind
• Engineered scroll-based interactive experiences using Framer Motion and Locomotive Scroll
• Built dynamic simulation engine for NAV and price behavior during black swan events
• Implemented backend logic using Node.js (Fastify) for scalable data processing
• Used React Query + Redux Persist for granular forex data caching
• Engineered centralized logging service and CI/CD pipelines in GitHub Actions
• Developed Go-based microservices for real-time price data aggregation using Gin and Fiber
• Contributing to product whitepaper and technical research documentation`,
    
  education: `Education:

B.Tech - Jaypee University of Engineering and Technology
• Mechanical Engineering`,
    
  certs: `Certifications:

• Pesto Tech Fellowship - Advanced Software Development (2023-2024)
• Alchemy University - Blockchain Development (2025)
• FreeCodeCamp UI Certification
• Udemy Backend Engineering with Go`,
    
  contact: `Contact Information:

📧 Email: anshul.tiwari1223@gmail.com
📱 Phone: +91 7891094019
💼 LinkedIn: https://www.linkedin.com/in/tiwari-anshul12/
🐙 GitHub: https://github.com/anshultiwari95
🐦 Twitter: @anshul_tiwari
🌐 Website: anshultiwari.dev`,
    
  whoami: `anshul`,
    
  date: new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }),
    
  ls: `total 8
drwxr-xr-x  2 anshul anshul 4096 Dec 15 10:30 .
drwxr-xr-x  3 anshul anshul 4096 Dec 15 10:30 ..
-rw-r--r--  1 anshul anshul  2.1K Dec 15 10:30 README.md
-rw-r--r--  1 anshul anshul  1.8K Dec 15 10:30 package.json
drwxr-xr-x  2 anshul anshul 4096 Dec 15 10:30 src/
drwxr-xr-x  2 anshul anshul 4096 Dec 15 10:30 public/
-rw-r--r--  1 anshul anshul  1.2K Dec 15 10:30 tsconfig.json
-rw-r--r--  1 anshul anshul  856B Dec 15 10:30 next.config.ts`,
    
  pwd: `/home/anshul/portfolio`,
    
  clear: '',
    
  matrix: 'Matrix mode activated! Digital rain effect enabled.',
    
  sudo: 'Sudo mode activated. You now have root privileges.',
    
  resume: '📄 Resume: Anshul_Tiwari_Resume.pdf\n\nClick to download my resume in PDF format.',
};

export default commandOutputs;
