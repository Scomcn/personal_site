import TechIcon from "@/components/TechIcon";
import { stackPyramid, stackPyramidTechnologies } from "@/data/stackPyramid";
import { getTechnologyLogo } from "@/data/technologyLogos";
import { technologies, type Technology } from "@/data/technologies";
import type { CSSProperties } from "react";
import styles from "./TechTicker.module.scss";

const TICKER_ROW_COUNT = 6;

const tickerTechnologies = technologies.filter(
  (tech) => !stackPyramidTechnologies.has(tech),
);

function distributeRows(
  items: readonly Technology[],
  rowCount: number,
): Technology[][] {
  const rows = Array.from({ length: rowCount }, () => [] as Technology[]);
  items.forEach((item, index) => {
    rows[index % rowCount].push(item);
  });
  return rows;
}

function renderTickerItems(items: Technology[], suffix: string) {
  return items.map((item) => {
    const logo = getTechnologyLogo(item);

    return (
      <span key={`${item}-${suffix}`} className={styles.item}>
        {logo ? <TechIcon logo={logo} /> : null}
        <span className={styles.itemLabel}>{item}</span>
      </span>
    );
  });
}

function PyramidEntry({ technology }: { technology: Technology }) {
  const logo = getTechnologyLogo(technology);

  return (
    <div className={styles.pyramidItem}>
      {logo ? <TechIcon logo={logo} /> : null}
      <span className={styles.pyramidLabel}>{technology}</span>
    </div>
  );
}

export default function TechTicker() {
  const rows = distributeRows(tickerTechnologies, TICKER_ROW_COUNT);

  return (
    <div className={styles.root}>
      <div className={styles.pyramid} aria-label="Core proficiencies">
        {stackPyramid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`${styles.pyramidRow} ${styles[`pyramidRow--${rowIndex}`]}`}
          >
            {row.map((technology) => (
              <PyramidEntry key={technology} technology={technology} />
            ))}
          </div>
        ))}
      </div>

      <div className={styles.ticker} aria-label="Additional technologies">
        {rows.map((rowItems, index) => {
          const direction = index % 2 === 0 ? "left" : "right";
          const offset = index * 7;

          return (
            <div
              key={index}
              className={`${styles.row} ${styles[`row--${direction}`]}`}
              style={
                {
                  "--row-duration": `${48 + index * 8}s`,
                  "--row-delay": `${-offset}s`,
                } as CSSProperties
              }
            >
              <div className={styles.track}>
                <span className={styles.trackGroup}>
                  {renderTickerItems(rowItems, "a")}
                </span>
                <span className={styles.trackGroup}>
                  {renderTickerItems(rowItems, "b")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
