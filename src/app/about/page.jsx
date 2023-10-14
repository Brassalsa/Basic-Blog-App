import SocialLinks from "@/components/common/socialLinks";

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-6">About </h2>
      <h3>Myself Saurav Chauhan </h3>
      <h4>Fullstack Web Developer</h4>
      <p>
        Hi, I’m Saurav Chauhan, a computer science graduate and a passionate
        coder. I love creating web applications that are fast, responsive, and
        user-friendly.
      </p>
      <p>
        I’m currently learning Next.js, a React framework that offers
        server-side rendering and routing features, by the way this whole
        website is build with Next.js . I enjoy the challenge of mastering new
        technologies and improving my skills as a developer.
      </p>
      <p>
        When I’m not coding, I like to play action-adventure games, mostly
        single-player ones. Some of my favorites are Uncharted, Spider-Man, and
        GTA. I find these games immersive, thrilling, and fun. They also inspire
        me to be more creative and adventurous in my own projects.
      </p>{" "}
      <p>
        {" "}
        My goal is to become a professional software engineer and create amazing
        websites and apps that can solve real-world problems and make people’s
        lives easier. I also want to share my knowledge and experience with
        other aspiring coders through my blog. I hope you find my blog useful
        and interesting. Feel free to contact me if you have any questions or
        feedback. Thank you for visiting! 😊
      </p>
      <h4 className="w-max mx-auto">Follow on Social Media</h4>
      <div className="flex flex-wrap gap-4 w-max mx-auto">
        <SocialLinks />
      </div>
    </div>
  );
};

export default AboutPage;
