import Layout from '../components/layout';
import styles from '../styles/resume.module.css';

export default function Resume() {
  return (
    <Layout>
      <main className="resume" itemscope itemtype="http://schema.org/Person">

        <a href="/resume.pdf" className="download-link">Download PDF</a>

        <header>
          <h1 itemprop="name">S. Roberto Andrade</h1>
          <h2 itemprop="jobTitle">Creative Technologist</h2>
          <meta itemprop="alternateName" content="Robert Andrade" />
          <meta itemprop="alternateName" content="Sergio Andrade" />
          <meta itemprop="gender" content="Non-binary" />
          <meta itemprop="pronouns" content="he/her/theirs" />

        </header>

        <section className="objective">
          <h3>Objective</h3>
          <p>Product Design focused front-end developer currently creating user-centric experiences using Vue.js, JavaScript, and Node. I enjoy working in cross-functional teams with product managers and designers to create design systems which are accessible, modular, extensible, and engaging. Passionate about prototyping to push products to their maximum potential incorporating principles from interaction design, motion design, and visual design. Driven to create memorable experiences for the user.</p>
        </section>

        <section className="education">
          <h3>Education</h3>

          <details>
            <summary>
              <span itemprop="alumniOf" itemscope itemtype="http://schema.org/EducationalOrganization">
                <span itemprop="name">University of Minnesota</span>
              </span>
              Bachelor of Arts in <span itemprop="degree">French Languages &amp;</span> and Literature<span itemprop="degree">American History</span>
              <time>2010 - 2014</time>
            </summary>
            <p>Bachelor's Program focusing on Post World War II American History and French Linguistics</p>
          </details>

          <details>
            <summary>
              <span itemprop="alumniOf" itemscope itemtype="http://schema.org/EducationalOrganization">
                <span itemprop="name">Prime Digital Academy</span>
              </span>
              <time>2018</time>
            </summary>
            <p>Full time full stack full engineering full course</p>
          </details>
        </section>

        <section className="work">
          <h3>Work</h3>

          <details>
            <summary>
              <span itemprop="worksFor" itemscope itemtype="http://schema.org/Oragnization">
                <span itemprop="name">Wiley</span>
              </span>
              <span itemprop="jobTitle">Creative Technologist</span>
              <time>2019 - Present</time>
            </summary>
            <p itemprop="description">
              Led front-end architecture of digital transformation of flagship product, Everything DiSC® on Catalyst™. Catalyst.everythingdisc.com helped over 100k users within the first year. Co-led implementation of design system across digital products. Consulted on design system for Dummies.com. Created code-based reusable prototypes with an emphasis on user experience and accessibility.
              Technologies: Vue.js, JavaScript, Tailwind CSS, Sass, Storybook, Vite, Adobe XD

            </p>
          </details>

          <details>
            <summary>
              <span itemscope itemtype="http://schema.org/Oragnization">
                <span itemprop="name">Constellation Mutual</span>
              </span>
              <span itemprop="jobTitle">DevOps Product Engineer</span>
              <time>2019</time>
            </summary>
            <p itemprop="description">
              Product DevOps Engineer Constellation Mutual, Minneapolis MN
              Helped lay foundation for SaaS platform to connect physicians with insurance agents. Technologies: Figma, React, AWS, and Jenkins
            </p>
          </details>

          <details>
            <summary>
              <span itemscope itemtype="http://schema.org/Oragnization">
                <span itemprop="name">Riley</span>
              </span>
              <span itemprop="jobTitle">Software Engineer</span>
              <time>2018 - 2019</time>
            </summary>
            <p itemprop="description">
              Developed product pages, advertising banners, and HTML emails to generate campaigns for clients such as Best Buy, Delta Airlines, and Three Rivers Parks to reach millions of users. Technologies: Laravel, React, HTML, and Vue.js
            </p>
          </details>
        </section>
        <section className="skills">
          <h3>Skills</h3>
          <details className='skills-category Front End'>
            <summary>
              <span itemprop="skills">
                <span itemprop="name">Front End</span>
              </span>
            </summary>
            <ul itemprop="skills">
              <li itemprop="name">JavaScript</li>
              <li itemprop="name">HTML</li>
              <li itemprop="name">CSS</li>
              <li itemprop="name">Vue.js</li>
              <li itemprop="name">Node.js</li>
              <li itemprop="name">React</li>
              <li itemprop="name">Jamstack</li>
              <li itemprop="name">Git</li>
            </ul>
          </details>
          <details className='skills-category design'>
            <summary>
              <span itemprop="skills">
                <span itemprop="name">Design</span>
              </span>
            </summary>
            <ul itemprop="skills">
              <li itemprop="name">Design Systems</li>
              <li itemprop="name">Interaction Design</li>
              <li itemprop="name">Motion Design</li>
              <li itemprop="name">Visual Design</li>
              <li itemprop="name">Human Centered Design</li>
              <li itemprop="name">Accessibility</li>
            </ul>
          </details>

          <details className="skills-category tools">
            <summary>
              <span >
                <span >Tools</span>
              </span>
            </summary>
            <ul itemprop="skills">
              <li itemprop="name">Figma</li>
              <li itemprop="name">Sketch</li>
              <li itemprop="name">Adobe XD</li>
              <li itemprop="name">Storybook</li>
              <li itemprop="name">Adobe Illustrator</li>
              <li itemprop="name">JIRA</li>
              <li itemprop="name">Agile</li>
              <li itemprop="name">Kanban</li>
            </ul>
          </details>
        </section>
        <section className="interests">
          <h3>Interests</h3>
          <ul>
            <li>
              Reading
            </li>
            <li>
              Music
            </li>
            <li>
              Video Games
            </li>
            <li>
              Hiking
            </li>
            <li>
              Museums
            </li>
            <li>
              Hairless Dogs
            </li>
          </ul>
        </section>
        <section className="contact">
          <h3>Contact</h3>
          <ul className="contact-list">
            <li><a href="https://robertandradejr.dev/" target="_blank" itemprop="url">Website: https://robertandradejr.dev/</a></li>
            <li><a href="mailto:ROBERT.ANDRADE.DEVELOPER@GMAIL.COM" target="_blank" itemprop="email">email: robert.andrade.developer@gmail.com</a></li>
            <li><a href="https://github.com/RobertAndradeJr" itemprop="sameAs">Github: https://github.com/RobertAndradeJr</a></li>
            <li><a href="https://twitter.com/abstract_coding" itemprop="sameAs">Twitter: abstract_coding</a></li>
            <li><a href="https://www.linkedin.com/in/srobertandrade" itemprop="sameAs">LinkedIn: SRobertAndrade</a></li>
            <li className={styles['print-only']}><span itemprop="telephone">(763) 501-9532</span></li>
          </ul>
        </section>
      </main>
    </Layout>
  )
}