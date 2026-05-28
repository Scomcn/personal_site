import ShaderBackground from "@/components/ShaderBackground";
import TechTicker from "@/components/TechTicker";
import Timeline from "@/components/Timeline";
import { cv, social } from "@/data/home";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <section
        id="about"
        className={styles.hero}
        aria-label="Introduction"
      >
        <ShaderBackground />
        <div className={styles.heroScrim} aria-hidden />
        <div className={styles.heroInner}>
          <div className={styles.heroIntro}>
            <div
              className={`${styles.heroColumn} ${styles.reveal}`}
              style={{ animationDelay: "0.08s" }}
            >
              <p className={styles.greetingMuted}>Hi, I&apos;m</p>
              <h1 className={styles.greetingName}>Scott</h1>
            </div>

            <div
              className={`${styles.heroIntroFooter} ${styles.reveal}`}
              style={{ animationDelay: "0.24s" }}
            >
              <p className={styles.lede}>
                I build websites, apps, and the products that millions of people use every day
              </p>
              <nav
                className={styles.social}
                aria-label="Social profiles"
              >
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <span
                    className={`${styles.socialIcon} ${styles.socialIconGithub}`}
                    aria-hidden
                  />
                  GitHub
                  <span className="sr-only">
                    {" "}
                    (opens in new tab)
                  </span>
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <span
                    className={`${styles.socialIcon} ${styles.socialIconLinkedin}`}
                    aria-hidden
                  />
                  LinkedIn
                  <span className="sr-only">
                    {" "}
                    (opens in new tab)
                  </span>
                </a>
                <a
                  href={cv.href}
                  download={cv.downloadFilename}
                  className={styles.linkButton}
                >
                  <span
                    className={`${styles.socialIcon} ${styles.socialIconDownload}`}
                    aria-hidden
                  />
                  Download CV
                </a>
              </nav>
            </div>
          </div>
        </div>

        <a
          href="#stack"
          className={`${styles.scrollCue} ${styles.reveal}`}
          style={{ animationDelay: "0.5s" }}
          aria-label="Scroll to stack"
        >
          <span>scroll</span>
          <span className={styles.scrollLine} aria-hidden />
        </a>
      </section>

      <section
        id="stack"
        className={styles.stack}
        aria-labelledby="stack-heading"
      >
        <header className={styles.stackHeader}>
          <h2 id="stack-heading" className={styles.stackHeading}>
            My Stack
          </h2>
        </header>
        <TechTicker />
      </section>

      <div
        id="experience"
        className={styles.content}
        role="region"
        aria-labelledby="timeline-heading"
      >
        <div className={styles.contentInner}>
          <Timeline />
          <footer
            id="contact"
            className={styles.footer}
            aria-label="Contact"
          >
            <p className={styles.footerText}>
              UK citizen, Canadian work visa holder.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
