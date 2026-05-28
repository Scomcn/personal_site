"use client";

import styles from "./SkipLink.module.scss";

export default function SkipLink() {
  const focusMain = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById("main-content");
    if (!main) return;

    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView();
    history.replaceState(null, "", "#main-content");
  };

  return (
    <a href="#main-content" className={styles.skipLink} onClick={focusMain}>
      Skip to main content
    </a>
  );
}
