import utilStyles from '../styles/utils.module.scss';
import prettyStyles from '../styles/resume/pretty.module.scss';
import machineStyles from '../styles/resume/machine.module.scss';

export default function ResumeTemplate({ pretty }) {
  const styles = pretty ? prettyStyles : machineStyles;
  const breakIfPretty = pretty ? <br /> : ' ';

  return (
    <article id="resume" className={`${styles.resume} ${utilStyles.paper}`} itemScope itemType="http://schema.org/Person">

      <header className={styles.title}>
        <h1 itemProp="name" className={styles.name}>S. Roberto{breakIfPretty}Andrade</h1>
        <h2 itemProp="jobTitle" className={styles['job-title']}>Creative Technologist</h2>
        <meta itemProp="alternateName" content="Robert Andrade" />
        <meta itemProp="alternateName" content="Sergio Andrade" />
        <meta itemProp="gender" content="Non-binary" />
        <meta itemProp="pronouns" content="he/her/theirs" />
      </header>

      <section className={`${styles.objective} ${styles.header}`}>
        <h3 className={styles.heading}>Objective</h3>
        <p>Product Design focused front-end developer currently creating user-centric experiences using Vue.js, JavaScript, and Node.
          I enjoy working in cross-functional teams with product managers and designers to create design systems which are accessible, modular, extensible, and engaging.
          Passionate about prototyping to push products to their maximum potential incorporating design principles and modern development practices.
          Driven to create memorable experiences for the user.</p>
      </section>

      <section className={styles.education}>
        <h3 className={styles.heading}>Education</h3>

        <details open>
          <summary>
            <h4 className={styles.degree}>
              <span itemProp="degree">French Language{breakIfPretty}&amp; Literature</span>,{breakIfPretty}<span itemProp="degree">American History</span>
            </h4>
            <span itemProp="alumniOf" itemScope itemType="http://schema.org/EducationalOrganization">
              <h5 itemProp="name" className={styles.organization}>University of Minnesota</h5>
            </span>
            <time className={styles.date}>2010 - 2014</time>
          </summary>
          <p>Bachelor of arts with concentrations in:</p>
          <ul>
            <li>Modern French linguistics and culture</li>
            <li>US History after World War II, Chicano Studies</li>
          </ul>

        </details>

        <details open>
          <summary>
            <h4 className={styles.degree}>
              Full-Stack Engineering
            </h4>
            <span itemProp="alumniOf" itemScope itemType="http://schema.org/EducationalOrganization">
              <h5 itemProp="name" className={styles.organization}>Prime Digital Academy</h5>
            </span>
            <time className={styles.date}>2018</time>
          </summary>
          <p>Intensive, industry leading Full Stack bootcamp.
            Created an online application portal to help other students gain acess to scholarship opportunities.
            Specialties include:
          </p>
          <ul>
            <li>Modern Development Best Practices</li>
            <li>Working in Agile</li>
            <li>Soft Skills</li>
            <li>SMongo, Express, React, Node</li>
          </ul>
        </details>
      </section>

      <section className={`${styles.experience} ${styles.header}`}>
        <h3 className={`${styles['experience-title']} ${styles.heading}`}>Experience</h3>

        <div className={styles['experience-list']}>
          <details open>
            <summary>
              <h4 itemProp="jobTitle" className={styles['job-title']}>Creative Technologist</h4>
              <span itemProp="worksFor" itemScope itemType="http://schema.org/Oragnization">
                <h5 className={styles.organization} itemProp="name">Wiley</h5>
              </span>
              <time className={styles.date}>2019 - Present</time>
            </summary>
            <p itemProp="description">
              Led front-end architecture of digital transformation of flagship product, Everything DiSC® on Catalyst™.
              Catalyst.everythingdisc.com helped over 100k users within the first year. Co-led implementation of design system across digital products.
              Consulted on design system for Dummies.com. Created code-based reusable prototypes with an emphasis on user experience and accessibility.
              {
                !pretty &&
                ` Responsibilities included: Maintaining and updating the design system, creating reusable components, and creating a design system for the new product.
                                        Mentoring other developers and designers. Collaborated with designers and developers to create a design system that is accessible, modular, extensible, and engaging.
                                        Contributing to convergence strategy for digital transformation of the products across the organization.`
              }
            </p>
            <h6>Technologies</h6>
            <ul className={pretty ? utilStyles.inlineList : undefined}>
              <li>Vue.js</li>
              <li>JavaScript</li>
              <li>Tailwind CSS</li>
              <li>Sass</li>
              <li>Storybook</li>
              <li>Vite</li>
              <li>Adobe XD</li>
              {
                !pretty &&
                <>
                  <li>Git</li>
                  <li>Jenkins</li>
                  <li>SCSS</li>
                  <li>TypeScript</li>
                  <li>Agile</li>
                  <li>Swagger</li>
                  <li>OpenAPI</li>
                </>
              }
            </ul>

          </details>

          <details open>
            <summary>
              <h4 className={styles['job-title']} itemProp="jobTitle">DevOps Product Engineer</h4>
              <span itemScope itemType="http://schema.org/Oragnization">
                <h5 className={styles.organization} itemProp="name">Constellation Mutual</h5>
              </span>
              <time className={styles.date}>2019</time>
            </summary>
            <p itemProp="description">
              Product DevOps Engineer Constellation Mutual, Minneapolis MN
              Helped lay foundation for SaaS platform to connect physicians with insurance agents.
              {
                !pretty &&
                ` Responsibilities included: Help create design system and build reusable components for new platform.
                      Help decide which technology stack would best suit our business use case. Mentoring other developers and front end development practice strategy.
                      Contribute to creating CI/CD pipeline for new product.`
              }
            </p>
            <h6>Technologies</h6>
            <ul className={pretty ? utilStyles.inlineList : undefined}>
              <li>Figma</li>
              <li>React</li>
              <li>AWS</li>
              <li>Jenkins</li>
              {
                !pretty &&
                <>
                  <li>Git</li>
                  <li>Jenkins</li>
                  <li>SCSS</li>
                  <li>TypeScript</li>
                  <li>Agile</li>
                  <li>Kanban</li>
                  <li>Sketch</li>
                  <li>Jest</li>
                </>
              }
            </ul>
          </details>

          <details open>
            <summary>
              <h4 itemProp="jobTitle" className={styles['job-title']}>Software Engineer</h4>
              <span itemScope itemType="http://schema.org/Oragnization">
                <h5 className={styles.organization} itemProp="name">Riley</h5>
              </span>
              <time className={styles.date}>2018 - 2019</time>
            </summary>
            <p itemProp="description">
              Developed product pages, advertising banners, and HTML emails to generate campaigns for clients such as Best Buy, Delta Airlines, and Three Rivers Parks to reach millions of users.
            </p>
            <h6>Technologies</h6>
            <ul className={pretty ? utilStyles.inlineList : undefined}>
              <li>Laravel</li>
              <li>React</li>
              <li>HTML</li>
              <li>Vue.js</li>
              {
                !pretty &&
                <>
                  <li>PHP</li>
                  <li>MJML</li>
                  <li>SCSS</li>
                  <li>Foundation</li>
                  <li>Wordpress</li>
                  <li>AWS</li>
                  <li>TypeScript</li>
                </>
              }
            </ul>
          </details>
        </div>

      </section>

      <section className={`${styles.skills} ${styles.header}`}>
        <h3 className={styles.heading}>Skills</h3>
        <details className='skills-category Front End' open>
          <summary>
            <span itemProp="skills">
              <h6 itemProp="name">Front End</h6>
            </span>
          </summary>
          <ul itemProp="skills">
            <li itemProp="name">JavaScript</li>
            <li itemProp="name">HTML</li>
            <li itemProp="name">CSS</li>
            <li itemProp="name">Vue.js</li>
            <li itemProp="name">Node.js</li>
            <li itemProp="name">React</li>
            <li itemProp="name">Jamstack</li>
            <li itemProp="name">Serverless</li>
            <li itemProp="name">Git</li>
          </ul>
        </details>

        <details className='skills-category design' open>
          <summary>
            <span itemProp="skills">
              <h6 itemProp="name">Design</h6>
            </span>
          </summary>
          <ul itemProp="skills">
            <li itemProp="name">Design Systems</li>
            <li itemProp="name">Interaction Design</li>
            <li itemProp="name">Motion Design</li>
            <li itemProp="name">Visual Design</li>
            <li itemProp="name">Human Centered Design</li>
            <li itemProp="name">Accessibility</li>
          </ul>
        </details>

        <details className="skills-category tools" open>
          <summary>
            <span >
              <h6>Tools</h6>
            </span>
          </summary>
          <ul itemProp="skills">
            <li itemProp="name">Figma</li>
            <li itemProp="name">Sketch</li>
            <li itemProp="name">Adobe XD</li>
            <li itemProp="name">Storybook</li>
            <li itemProp="name">Adobe Illustrator</li>
            <li itemProp="name">JIRA</li>
            <li itemProp="name">Agile</li>
            <li itemProp="name">Kanban</li>
          </ul>
        </details>
      </section>

      <section className={`${styles.interests} ${styles.header}`}>
        <h3 className={styles.heading}>Interests</h3>
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

      <section className={`${styles.contact} ${styles.header}`}>
        <address>
          <h3 className={styles.heading}>Contact</h3>
          <ul className="contact-list">
            <li className={styles['print-only']}>{!pretty && <h6 className={styles.link}>tel</h6>}<span itemProp="telephone"><a href="tel:763-501-9532">(763) 501-9532</a></span></li>
            <li><a href="https://robertandradejr.dev/" target="_blank" rel="noreferrer" itemProp="url">{!pretty && <h6 className={styles.link}>website</h6>}robertandradejr.dev/</a></li>
            <li><a href="mailto:ROBERT.ANDRADE.DEVELOPER@GMAIL.COM" target="_blank" rel="noreferrer" itemProp="email"><h6 className={styles.link}>email</h6>robert.andrade.developer{pretty ? <br /> : ''}@gmail.com</a></li>
            <li><a href="https://github.com/RobertAndradeJr" itemProp="sameAs"><h6 className={styles.link}>GitHub</h6>RobertAndradeJr</a></li>
            <li><a href="https://twitter.com/abstract_coding" itemProp="sameAs"><h6 className={styles.link}>Twitter</h6>abstract_coding</a></li>
            <li><a href="https://www.linkedin.com/in/srobertandrade" itemProp="sameAs"><h6 className={styles.link}>LinkedIn</h6>SRobertAndrade</a></li>
          </ul>
        </address>
      </section>
    </article>
  )
}