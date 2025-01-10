  const About = () => {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">About Me...</h1>
          {/* My picr */}
      <div className="mt-4 flex">
        <img
          src="/Lanartcom.png" // Replace with your banner image path
          alt="Food Banner"
          className="max-w-max max-h-48 rounded-lg"
        />
      </div>
        <p className="mt-2">
          Hi! I’m Lana, an artist and a budding programmer passionate about merging creativity and technology. My journey began with capturing human emotion through vibrant colors and abstract forms using acrylics and mixed media. Inspired by nature and daily life’s subtleties, I aim to evoke connection and reflection in every creation.
        </p>
        <p className="mt-2">
          Now, as I explore programming, I’m discovering the magical intersection where creative expression meets technical innovation. Learning to code has been an exciting adventure, and I love seeing how my artistic skills and newfound technical abilities grow together to build something impactful—like this recipe finder app.
        </p>
        <p className="mt-2">
          When I’m not coding or in the studio, I enjoy walking, exploring art galleries, and cooking—activities that fuel my creativity and keep my perspective fresh.
        </p>
        <p className="mt-2">
          Thank you for visiting my space! I hope it inspires you as much as it inspires me. Feel free to check out my GitHub <a href="https://github.com/Lanartcom" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lanartcom</a> to follow along on my programming journey.
        </p>
        <p className="mt-2">Warmly, <br /> Lana</p>
      </div>
    );
  };
  
  export default About;
  