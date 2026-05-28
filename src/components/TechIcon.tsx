import type { TechnologyLogo } from "@/data/technologyLogoTypes";
import styles from "./TechIcon.module.scss";

type TechIconProps = {
  logo: TechnologyLogo;
};

export default function TechIcon({ logo }: TechIconProps) {
  return (
    <span className={styles.badge} aria-hidden>
      {logo.type === "emoji" ? (
        <span className={styles.emoji}>{logo.emoji}</span>
      ) : logo.type === "png" ? (
        <img
          src={logo.src}
          alt=""
          className={styles.icon}
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <svg
          className={styles.icon}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{logo.icon.title}</title>
          <path d={logo.icon.path} fill={`#${logo.icon.hex}`} />
        </svg>
      )}
    </span>
  );
}
