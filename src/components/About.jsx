const About = () => {
    return (
        
      <div className="p-4 md:p-10">
        <h1 className="text-amber-600 text-xl md:text-2xl font-bold m-2">Welcome to Foodie, your go-to recipe finder!
        </h1>
        {/* Flex container for text and image */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Text content on the left */}
          <div className="flex-1 max-w-prose">
            <p className="mt-2">
              Hi! I’m Lana, a digital artist and aspiring frontend developer exploring the exciting world of programming. My journey into tech started with a curiosity to create tools that make everyday life a little easier—and this recipe finder is one of my first big steps in bringing that vision to life.
            </p>
            <p className="mt-2">
              This project combines my love for cooking with the skills I’m learning in React, Tailwind CSS, and API integration. From searching for recipes to diving into detailed preparation steps, I’ve aimed to create an experience that’s both fun and functional. While it’s far from perfect, it reflects my growth as a developer and my commitment to learning.
            </p>
            <p className="mt-2">
              When I’m not coding, I enjoy cooking, walking, and finding inspiration in art and nature. These moments fuel my creativity and help me approach problems with fresh ideas and perspectives.
            </p>
            <p className="mt-2">
              Thanks for stopping by! If you’d like to follow my programming journey, feel free to check out my GitHub{' '}
              <a
                href="https://github.com/Lanartcom"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700 transition-colors"
              >
                Lanartcom
              </a>{' '}
              where I share my projects and progress.
            </p>
            <p className="mt-2">Warmly, <br /> Lana</p>
          </div>
  
          {/* Image on the right */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/Lanartcom.png"
              alt="Lana's profile"
              className="max-w-full h-90 md:max-h-96 rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default About;