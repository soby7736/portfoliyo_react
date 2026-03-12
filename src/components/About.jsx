import "bootstrap-icons/font/bootstrap-icons.css";
import "./About.css";

function About() {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <p className="about-subtitle">Get To Know More</p>
          <h2 className="about-title">About Me</h2>
          <div className="about-divider"></div>
        </div>

        <div className="row text-center g-4 mb-5">
          {/* Experience */}
          <div className="col-md-4">
            <div className="about-card h-100">
              <div className="about-card-icon">
                <i className="bi bi-award"></i>
              </div>
              <h5 className="about-card-title">Experience</h5>
              <p className="about-card-text">
                Fresher <br />
                Internship at Luminar Technolab
              </p>
            </div>
          </div>

          {/* Projects */}
          <div className="col-md-4">
            <div className="about-card h-100">
              <div className="about-card-icon">
                <i className="bi bi-code-slash"></i>
              </div>
              <h5 className="about-card-title">Projects</h5>
              <p className="about-card-text">3+</p>
            </div>
          </div>

          {/* Education */}
          <div className="col-md-4">
            <div className="about-card h-100">
              <div className="about-card-icon">
                <i className="bi bi-mortarboard"></i>
              </div>
              <h5 className="about-card-title">Education</h5>
              <p className="about-card-text">
                BSc Computer Science <br />
                LNASC Mayannur
              </p>
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="about-bio">
              <p>
                <strong>Soby Francis</strong>, a determined and enthusiastic{" "}
                <strong>Python Full Stack Developer</strong> based in{" "}
                Thrissur, Kerala. I'm passionate about turning
                complex problems into elegant digital solutions.
              </p>
              <p>
                Proficient in{" "}
                <strong>
                  Python, Django, REST API development, and React
                </strong>
                , with a solid foundation in front-end technologies including{" "}
                <strong>HTML, CSS, JavaScript, and Bootstrap</strong>. I enjoy
                working across the full stack — designing the data layer,
                building robust APIs, and creating responsive user interfaces.
              </p>
              <p className="about-bio-em">
                <em>
                  Eager to apply technical skills and knowledge to contribute to
                  innovative projects and collaborative development teams.
                </em>
              </p>
              <p>
                I'm currently looking for opportunities where I can grow, learn,
                and create meaningful impact through code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
