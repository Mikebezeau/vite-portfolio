//vr arcade
import vrtitle from "../assets/projects/arcade/title.jpg";
//rpg2
import rpgEdit from "../assets/projects/rpg2/edit.jpg";
import rpgBook from "../assets/projects/rpg2/book.jpg";
import rpgBook2 from "../assets/projects/rpg2/book2.jpg";
import rpgwandermap from "../assets/projects/rpg2/wandermap.jpg";
import rpgwaveform from "../assets/projects/rpg2/waveform.jpg";
import rpgtileset from "../assets/projects/rpg2/tileset.jpg";
import rpgmapgen from "../assets/projects/rpg2/mapgen.jpg";
import rpgportal from "../assets/projects/rpg2/portal.jpg";
import rpggame from "../assets/projects/rpg2/game.jpg";
import rpglogin from "../assets/projects/rpg2/login.jpg";
import logo from "/logo.png";
//rpg
import rpgbackpack from "../assets/projects/rpg/backpack.jpg";
import rpgcharpopup from "../assets/projects/rpg/charpopup.jpg";
import rpgcharselect from "../assets/projects/rpg/charselect.jpg";
import rpgcharsheet from "../assets/projects/rpg/charsheet.jpg";
import rpgcharsheetfull from "../assets/projects/rpg/charsheetfull.jpg";
import rpgcombat from "../assets/projects/rpg/combat.jpg";
import rpgeffects from "../assets/projects/rpg/effects.jpg";
import rpgequip from "../assets/projects/rpg/equip.jpg";
//import rpgfront from "../assets/projects/rpg/front.jpg";
import rpgmapedit from "../assets/projects/rpg/mapedit.jpg";
import rpgadventure from "../assets/projects/rpg/adventure.jpg";
import rpgspells from "../assets/projects/rpg/spells.jpg";
//space
import spacemain from "../assets/projects/space/main.jpg";
import spacecity from "../assets/projects/space/city.jpg";
import spacedesign from "../assets/projects/space/design.jpg";
import spacemap from "../assets/projects/space/map.jpg";
import spaceplanet from "../assets/projects/space/planet.jpg";
import spaceroad from "../assets/projects/space/road.jpg";
//rockwell
import rockwell from "../assets/projects/alota/rockwell.jpg";
//coop
import coop from "../assets/projects/alota/coop.png";
//moduleblocks
import ModuleBlocks from "../assets/projects/alota/mod.jpg";
//concertninja
import ninja from "../assets/projects/concert/ninja.jpg";
import concert from "../assets/projects/concert/concert.png";
//focus21
import focus from "../assets/projects/focus/focus.jpg";
//strong
import strong from "../assets/projects/strong/strong.jpg";
//parking
import park from "../assets/projects/park/park.jpg";

const personalProjects = [
  {
    id: "portfolio",
    url: "",
    urlGithub: "https://github.com/Mikebezeau/vite-portfolio/tree/master",
    images: [{ src: logo }],
    title: "Portfolio",
    assoc: "",
    description: "Some neat little thigs about this website.",
    details: [
      {
        heading: "React",
        content:
          "Frontend development using React, ensuring a responsive user interface",
      },
      {
        heading: "Vite Build Tool",
        content:
          "Vite is an ideal choice for developers who prioritize speed and are eager to leverage modern browser features. It's particularly well-suited for small to medium-sized projects, prototypes, and applications that require quick feedback during development.",
      },
      {
        heading: "React-router, 'useBlocker'",
        content:
          "The 'useBlocker' hook allows you to prevent the user from navigating away from the current location. It must be used used with one if the new routers, in this case 'createBrowserRouter'. This was used in concert with the lightbox image gallery, so that if the lightbox is open, the back button will close the galery instead of going back a page. Very useful on mobile devices.",
      },
      {
        heading: "Transparent Background Image",
        content:
          "Using the 'linear-gradient' CSS rule with an RGBA colour. Setting the alpha parameter creates the transpartent effect on the image.",
      },
    ],
  },
  {
    id: "vr",
    url: "https://blackbirdtech.ca/",
    urlGithub: "https://github.com/Mikebezeau/vr-arcade",
    images: [{ src: vrtitle }],
    title: "VR Arcade Mockup",
    assoc: "",
    description:
      "Built with React and Tailwind CSS, this website boasts responsive design and slick animations that elevate your browsing experience to new heights. Immerse yourself in stunning visuals enhanced by image parallax scroll.",
    details: [
      {
        heading: "Frontend with React",
        content:
          "Frontend development using React, ensuring a responsive user interface. ",
      },
      {
        heading: "Booking System",
        content:
          "With just a few clicks, users can effortlessly select their preferred date and time from available options, ensuring a seamless booking process. Once confirmed, a confirmation email is sent directly to your inbox, providing peace of mind and confirming your reservation with ease.",
      },
      {
        heading: "API Development",
        content:
          "A custom API backend created using Express, Sequelize and MySQL2",
      },
    ],
  },
  {
    id: "rpg2",
    url: "http://31.220.108.214/rpg/",
    urlGithub: "https://github.com/Mikebezeau/RPG-V2-Frontend",
    images: [
      { src: rpglogin },
      { src: rpgBook },
      { src: rpgBook2 },
      { src: rpgEdit },
      { src: rpgportal },
      { src: rpggame },
      { src: rpgwandermap },
      { src: rpgwaveform },
      { src: rpgtileset },
      { src: rpgmapgen },
    ],
    title: "Mutiplayer Dungeons and Dragons",
    assoc: "",
    description:
      "Employing a diverse range of technologies to test develop a multiplayer RPG experience, and procedural world generation using various techniques. My work includes frontend development, real-time multiplayer functionality, database management, and more.",
    details: [
      {
        heading: "Frontend with React",
        content:
          "Frontend development using React, ensuring a responsive user interface.",
      },
      {
        heading: "Responsive Design",
        content:
          "The games frontend design is responsive, providing an optimal user experience on mobile devices.",
      },
      {
        heading: "GitHub Copilot & AI Coding",
        content:
          "Currently working with GitHub Copilot. Also, in experimentation with AI coding using ChatGPT, I was successful in creating several templates for functions that included the core functionality requirements, thus speeding up development time.",
      },
      {
        heading: "Real-time Multiplayer",
        content:
          "Implemented Socket.io and CORS for real-time multiplayer gameplay and chat features.",
      },
      {
        heading: "API Development",
        content:
          "Backend API uses Express, MySQL2, and Sequelize, enabling robust communication via Axios.",
      },
      {
        heading: "State Management",
        content: "Utilized Zustand for efficient frontend state management.",
      },
      {
        heading: "Sprite System",
        content:
          "Created a custom sprite system for character and effect animations.",
      },
      {
        heading: "Database Architecture",
        content:
          "Relational database with 20+ tables, includes game data for the character creation tool, based on Pathfinder 2 rules.",
      },

      {
        heading: "Virtual Private Server Setup",
        content:
          "Established and configured a secure Ubuntu-based Virtual Private Server (VPS) to host the project. Implemented SSH access keys for secure remote access, ensuring the project's reliability and security.",
      },
      {
        heading: "Procedural Map Generation",
        content:
          "Developed a 2D-top-down procedural map generation system utilizing the 'seedrandom' library to ensure consistent map generation. The system employs a 'Wave Function Collapse' algorithm, analyzing patterns in small sample images to generate diverse and visually compelling map layouts. Custom-built map tile placement and 'Random Walk' algorithms enable the creation of randomized maps on the fly, ensuring each playthrough offers unique exploration experiences. Additionally, the use of a consistent seed ensures that using the same seed will result in the generation of identical maps, eliminating the need to store map data in the database.",
      },
    ],
  },
  {
    id: "rpg",
    url: "https://mikebezeau.x10.mx/rpg",
    urlGithub: "https://github.com/Mikebezeau/RPG",
    images: [
      { src: rpgcombat },
      { src: rpgcharselect },
      { src: rpgadventure },
      { src: rpgcharpopup },
      { src: rpgcharsheet },
      { src: rpgbackpack },
      { src: rpgequip },
      { src: rpgspells },
      { src: rpgcharsheetfull },
      { src: rpgeffects },
      { src: rpgmapedit },
    ],
    title: "Online Roleplaying Game",
    assoc: "",
    description:
      "An immersive online Dungeons and Dragons (D&D) experience where players can embark on adventures, interact with a dynamic world, and engage in epic battles with monsters. Overall, the project aims to deliver an immersive and customizable online D&D experience, combining rich interactivity, dynamic gameplay mechanics, and powerful editing tools to create an engaging and memorable gaming experience for players.",
    details: [
      {
        heading: "Interactivity with jQuery",
        content:
          "The game's frontend is designed with rich interactivity using the jQuery library. This allows for smooth and responsive user interactions, including character movement, menu navigation, and spellcasting animations.",
      },
      {
        heading: "Responsive Design",
        content:
          "The games frontend design is responsive, providing an optimal user experience on mobile devices.",
      },
      {
        heading: "Backend Development with PHP",
        content:
          "The backend of the game has been developed using PHP, providing a robust and scalable foundation for managing user data, game states, and server-side operations.",
      },
      {
        heading: "Database Architecture",
        content: "A complex relational database with a little over 100 tables.",
      },
      {
        heading: "Fully Savable Game State",
        content:
          "The game features a comprehensive save system that preserves all aspects of the player's progress. This includes item locations, equipped gear, active spells, ongoing effects (such as buffs and debuffs), summoned creatures, party companions, monster status', and crucial game event and conversation information.",
      },
      {
        heading: "Intuitive Character Creation Tool",
        content:
          "Players have access to an intuitive character creation tool, allowing them to customize their characters with ease. This uses the rules system of the Pathfinder role playing game.",
      },
      {
        heading: "Complex Rules System",
        content:
          "A rules system that can easily fill 400 page books. The ongoing process of translating the Pathfinder role playing game system into an online web-based system has been challenging, and a lot of fun.",
      },
      {
        heading: "Sprite System",
        content:
          "Created a custom sprite system for character and effect animations.",
      },
      {
        heading: "Combat System",
        content:
          "The game incorporates a robust combat system where players can utilize a variety of abilities and spells during battles. Actions such as attacking, casting spells, using items, and employing tactics are seamlessly integrated into the gameplay experience.",
      },
      {
        heading: "Scriptable Monster Behavior",
        content:
          "Monsters encountered in battles exhibit dynamic behavior patterns, controlled by scripts that govern their actions, abilities, and strategies. This adds depth and challenge to encounters, ensuring that battles remain engaging and unpredictable",
      },
      {
        heading: "Adventure and Map Editing Tool",
        content:
          "The game includes a powerful adventure and map editing tool, enabling players to create their own custom adventures, dungeons, and worlds. This toolset allows for the creation of maps, placement and creation of monsters, treasures, NPCs, item shops, dynamic weather conditions, lighting effects, and detailed descriptions of areas",
      },
      {
        heading: "Special Effect Creation Tool",
        content:
          "A specialized tool provided for designing the effects and visuals of spells, abilities, and magic items. This tool allows for the selection of sprite animations, particle effects, and canvas-based visual enhancements to create stunning and immersive effects when triggered in the game.",
      },
      {
        heading: "Event Creation Tool",
        content:
          "The Event Creation Tool empowers Dungeon Masters to craft immersive and dynamic experiences for players. DMs can create events triggered by player actions or specific conditions, such as initiating surprise battles, teleporting players to new locations, revealing hidden passages, adding cutscenes, or placing treasure hordes. This includes the option to have the event occur only once for the player, or repeatedly. This tool adds depth and unpredictability to the game world, allowing DMs to tailor the adventure to suit their storytelling vision.",
      },
      {
        heading: "Conversation Editor",
        content:
          "The Conversation Editor provides a versatile platform for designing interactive dialogues within the game. Players can engage in conversations with NPCs, uncovering valuable information, receiving quests, purchasing or acquiring items and equipment, or influencing the course of the narrative. This tool allows for the creation of both generic area-specific dialogues and unique NPC interactions, enriching the player's exploration experience and immersing them further into the game world.",
      },
    ],
  },
  {
    id: "space",
    url: "https://mikebezeau.x10.mx/space/",
    urlGithub: "https://github.com/Mikebezeau/space_sim",
    images: [
      { src: spacemain },
      { src: spaceplanet },
      { src: spacemap },
      { src: spacedesign },
      { src: spacecity },
      { src: spaceroad },
    ],
    title: "React 3D Space Game",
    assoc: "",
    description:
      "Welcome to a journey into the depths of space! This experimental project was created in React using Three.js. Use the mouse to control the space ship, the up and down arrow keys to speed up and slow down. Right click opens and closes the main menu, where you can inspect the 'Galaxy Star Map', move the map with your mouse and click to target star systems to visit. During flight, warp to a targeted planet with a left click. Toggle the 'Testing' switch on the left to check out the 'Equipment' editor, and the 'Planet Walk' option to view a sample planet surface.",
    details: [
      {
        heading: "Frontend with React",
        content:
          "Frontend development using React, ensuring a responsive user interface.",
      },
      {
        heading: "Responsive Design",
        content:
          "The games frontend design is responsive, providing an optimal user experience and game controls on mobile devices.",
      },
      {
        heading: "3D Development",
        content:
          "Leveraging the capabilities of Three.js and Three-Fiber, the player can create 3D models with the in game editor, or gLTF models can be imported for more complex designs.",
      },
      {
        heading: "Procedurally Generated Environments",
        content:
          "This project features procedurally generated planet surfaces, cities, and 10,000 star systems positioned in a spiral arm galaxy. This allows for nearly endless exploration and discovery for players. Sophisticated techniques are used such as a version of the Perlin noise algorithm known as Simplex noise",
      },
      {
        heading: "3D Model Editor",
        content:
          "The 3D model editor allows players to customize every aspect of their spacecraft. From tweaking the shape and size of parts to fine-tuning the position and power of weapons and shields, the editor provides freedom for players to craft their perfect vessel. Whether you prefer sleek and agile fighters or heavily armored behemoths, the possibilities are endless. With a vast array of options, the ship editor ensures that every ship reflects the unique style and strategy of its commander. So, unleash your imagination and design the ultimate spacecraft to conquer the cosmos!",
      },
    ],
  },
];

const professionalProjects = [
  {
    id: "focus",
    url: "",
    urlGithub: "",
    images: [{ src: focus }],
    title: "PDF Report Generator",
    assoc: "Focus21, Proprietary Product",
    description:
      "Our agile development team worked on a challenging full stack web development contract, ensuring timely deliverables and achieving 'raving fan' client satisfaction. Tailored for large-scale manufacturing companies seeking efficient and customizable reporting capabilities. Designed with the needs of manufacturing professionals in mind, this application empowers users to effortlessly create personalized PDF reports. With an intuitive drag-and-drop interface, crafting reports becomes a breeze. Users can seamlessly incorporate images, headings, text, and graphs, in all mannor of styles, all with the simple click of a mouse. With these comprehensive customization options, our PDF report generator empowers users to create visually compelling and informative graphs that effectively communicate their data-driven insights.",
    details: [
      {
        heading: "Graph Styles",
        content:
          "Our PDF report generator offers an extensive array of customization options for graphs, ensuring users can tailor their visualizations to suit their specific needs and preferences.",
      },
      {
        heading: "Color Selection",
        content:
          "Customize the colors of your graphs to match your company's branding or to convey specific meanings. Choose from a wide spectrum of colors to highlight key data points or differentiate between different categories.",
      },
      {
        heading: "Labels",
        content:
          "Easily add labels to your graphs to provide context and clarity. Label axes, data points, or sections of the graph to ensure that your audience understands the information being presented.",
      },
      {
        heading: "Multi-Layered Graphs",
        content:
          "Compare multiple sets of data simultaneously with our multi-layered graph feature. Overlay different data sets on the same graph to identify trends, patterns, and correlations more effectively.",
      },
      {
        heading: "Data Selection",
        content:
          "Graph data can be selected based on various criteria, including date-time, tags, and facility location. This granular level of control enables users to drill down into specific subsets of data and generate insights tailored to their requirements.",
      },
      {
        heading: "Presentation of Various Metrics",
        content:
          "Whether it's production data, quality control metrics, or performance analytics, our PDF report generator provides the tools necessary to visualize and present a wide range of metrics. From production output over time to quality control metrics by facility location, users have the flexibility to showcase the data that matters most to their audience.",
      },
    ],
  },
  {
    id: "parkpass",
    url: "",
    urlGithub: "",
    images: [{ src: park }],
    title: "ParkPass Pro",
    assoc: "Black Bird Technology, Proprietary Product of Allied REIT",
    description:
      "ParkPass Pro is a comprehensive parking management software designed to streamline parking pass and visitor parking allowances for office buildings. Overall, ParkPass Pro offers a user-friendly interface and powerful features to efficiently manage parking passes and visitor parking allowances, ensuring smooth operations and optimal utilization of parking facilities in office buildings.",
    details: [
      {
        heading: "Querying Options",
        content:
          "Users can search for parking passes and visitor information using various criteria such as license plate, driver name, employee number, parking pass number, location, notes, infractions, and warnings.",
      },
      {
        heading: "Sortable and Editable Parking Pass List",
        content:
          "The software provides a sortable and editable parking pass list categorized by tenant and location. Users have full CRUD (Create, Read, Update, Delete) functions to manage parking pass data efficiently.",
      },
      {
        heading: "Reporting and Statistics",
        content:
          "ParkPass Pro generates month-end or 30-day reports displaying statistics on tickets issued and visitor frequency, providing valuable insights into parking lot usage.",
      },
      {
        heading: "Automated Whitelist Checking",
        content:
          "The software automatically checks license plates against whitelist databases to verify parking permissions. It can cross-check vehicle presence within the parking lot, identify frequent visitors, and reference special instructions for certain vehicles.",
      },
      {
        heading: "Parking Pass Validation",
        content:
          "Parking lot monitors can use their mobile devices to access a real-time parking pass list, checking validity and viewing relevant notes for all parking passes at a specific location.",
      },
      {
        heading: "Export Functionality",
        content:
          "Parking pass data can be easily exported to spreadsheets for sharing and further analysis, enhancing collaboration and communication among stakeholders.",
      },
    ],
  },
  {
    id: "ninja",
    url: "",
    urlGithub: "",
    images: [{ src: ninja }, { src: concert }],
    title: "ConcertNinja",
    assoc: "",
    description:
      "The ultimate ticket sales platform combined with a robust admin backend, designed to streamline concert experiences for both users and promoters alike.",
    details: [
      {
        heading: "Ticket Sales",
        content:
          "At the core of ConcertNinja is a powerful ticket sales platform, meticulously crafted to ensure seamless transactions and hassle-free experiences for concert-goers. Payments are effortlessly handled through Shopify, providing users with a secure and convenient checkout process.",
      },
      {
        heading: "Music Promoter Admin Portal",
        content:
          "Website built on Laravel 4. Leveraging the Facebook API, users can log in using their Facebook credentials, unlocking access to a wealth of social data including friends and likes. Promoters are empowered with specialized tools, accessible through a dedicated login page, to effectively manage their Facebook pages and maximize outreach.",
      },
      {
        heading: "UI/UX",
        content:
          "ConcertNinja sets itself apart with a focus on responsive layouts and a clean, engaging UI/UX design. Every aspect of the platform is optimized for usability and enjoyment, promising users an immersive and enjoyable experience from start to finish.",
      },
    ],
  },
  {
    id: "mod",
    url: "",
    urlGithub: "",
    images: [{ src: ModuleBlocks }],
    title: "ModuleBlocks",
    assoc: "Aholattafun Creative Solutions, Proprietary Product",
    description:
      "A system I designed and developed to assist with our development process. Using a combination of JavaScript and PHP, ModuleBlocks revolutionized the creation of our websites. I'm pleased to say that our company was able to secure IRAP funding (The National Research Council of Canada, Industrial Research Assistance Program) to continue work on our ModuleBlocks system, paving the way for even more efficient and innovative development processes.",
    details: [
      {
        heading: "Quick and Easy Database Setup",
        content:
          "With ModuleBlocks, developers have access to a user-friendly form interface where they can specify table and field requirements effortlessly. This includes selecting field types to accommodate various data types such as basic strings, enumerator values for options, select box or checkbox selections, images, and more.",
      },
      {
        heading: "Admin Portal",
        content:
          "Once the developer finalizes these requirements, ModuleBlocks springs into action, automatically generating the necessary database and tables. Additionally, it constructs a backend form for seamless input of product data, facilitating the management of crucial information like product details. It also constructs a searchable admin list view, equipped with text search and filters, empowering administrators to efficiently navigate and manage the system.",
      },
      {
        heading: "Front End",
        content:
          "ModuleBlocks doesn't stop there. On the front end, ModuleBlocks creates list pages and product detail pages, providing users with an intuitive interface to explore and search for items.",
      },
      {
        heading: "Automated Development",
        content:
          "By automating much of the heavy lifting involved in launching new projects, ModuleBlocks accelerates development timelines and boosts productivity.",
      },
    ],
  },
  {
    id: "coop",
    url: "",
    urlGithub: "",
    images: [{ src: coop }],
    title: "The Co-operators: Your Store",
    assoc: "Aholattafun Creative Solutions, Proprietary Product",
    description:
      "The Co‑operators is a leading insurance and financial services organization. 'Your Store' integrates all marketing and advertising an agent needs, from multiple departments and multiple portals into a single online platform. Multiple vendor products and services are streamlined into a single shopping cart system. A more advanced version of our similar project, the Rockwell Automation: Competitive Edge marketplace. This project was the first to fully utilize the 'ModuleBlocks' development system (also listed in the projects section). Our innovative system seamlessly integrates three distinct stores under one roof, catering to users from The Co-operators, HB, and Cumis with specialized branding tailored to their respective companies. As a key member of our development team, my primary responsibilities included meticulously crafting the system's architecture through pre-production documentation, bringing dynamic elements to life with jQuery animations, and ensuring a visually stunning experience. Additionally, we contributed to the seamless interaction between front-end display pages and MySQL data retrieval, ensuring smooth navigation and optimal performance for our users. Explore our platform to discover a seamless, secure, and tailored e-commerce experience designed exclusively for employees of The Co-operators, HB, and Cumis.",
    details: [
      {
        heading: "Sucurity and User Privileges",
        content:
          "At the heart of our platform is a robust security framework, using encription and session tokens, ensuring that users can access webpages and elements based on their functional privileges, enhancing both convenience and confidentiality.",
      },
      {
        heading: "Admin Portal",
        content:
          "This project also made use of our admin portal. Designed to streamline every aspect of managing the online store. With intuitive tools, the user can enter product details like descriptions, sizes, colors, and images. This platform accommodates a wide range of product variations. Additionally, staff performance is tracked with comprehensive reports and rankings, to optimize team productivity and reward top achievers effectively.",
      },
    ],
  },
  {
    id: "rockwell",
    url: "",
    urlGithub: "",
    images: [{ src: rockwell }],
    title: "Rockwell Automation: Competitive Edge",
    assoc: "Aholattafun Creative Solutions, Proprietary Product",
    description:
      "An internal marketplace and ranking system for sales staff within the national Rockwell ecosystem. access a diverse array of branded merchandise and essential sales tools. Developed with a keen focus on efficiency, security, and user experience, Rockwell Marketplace revolutionizes the way staff members procure resources to excel in their sales endeavors. This project was extended to include a fully reusable HTML5/jQuery animated checkers lottery game, which I was the lead programmer for.",
    details: [
      {
        heading: "Point-based Online Market",
        content:
          "Crafted to streamline the procurement process and incentivize engagement. Users earn points through various activities and sales achievements, empowering them to make purchases within the platform. Whether it's high-quality branded merchandise to represent the Rockwell brand with pride or essential tools to bolster sales strategies, Rockwell Marketplace offers a comprehensive selection tailored to meet the diverse needs of staff members.",
      },
      {
        heading: "Animated Checkers Lottery Game",
        content:
          "An animated checkers simulation with 3D perspective created with jQuery and CSS calcuations. Players of the lottery are given a play code, which determines the outcome of the match. The player is allowed to make the first move of the game, and the rest of the match unfolds according to the set result for that play code. To accomplish this, I programmed the system to quickly play hundres of checkers matches, bot vs. bot, and record the move sets to create a list of games. Thus I obtained the required number of games and results for each possible starting move. The result was that a player would enter their code, make the first move, and the system would use a move set for the rest of the match that ended with the result corresponding to their code. That way we could limit the percentage of winning codes that were distributed to staff. Winners would be rewarded with bonus points for the marketplace. I was fully responsible for the completion of this feature.",
      },
      {
        heading: "Admin Portal",
        content:
          "Designed to streamline every aspect of managing the online store. With intuitive tools, the user can enter product details like descriptions, sizes, colors, and images. This platform accommodates a wide range of product variations. Additionally, staff performance is tracked with comprehensive reports and rankings, to optimize team productivity and reward top achievers effectively.",
      },
    ],
  },
  {
    id: "strong",
    url: "https://stronglinknetworking.ca/",
    urlGithub: "",
    images: [{ src: strong }],
    title: "Strong Link Networking",
    assoc: "Nautilus Consulting",
    description:
      "Local business networking, learning, and growth opportunities. The platform is dedicated to fostering meaningful connections and providing valuable resources to empower entrepreneurs and professionals in our community. Whether you're seeking new business partnerships, industry insights, or personal development opportunities, StrongLink is here to support your journey to success.",
    details: [
      {
        heading: "Wordpress",
        content:
          "Built on WordPress, this website offers a user-friendly experience designed with the group moderator in mind. With intuitive navigation and straightforward functionalities, to allow for ease of managing the network and facilitating engagement.",
      },
    ],
  },
];

export { personalProjects, professionalProjects };
