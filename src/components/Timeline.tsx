"use client";

import {
  groupTimelineByYear,
  timelineItems,
  typeLabels,
  type TimelineEntry,
  type TimelineProject,
  type TimelineSide,
} from "@/data/timeline";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Timeline.module.scss";

function ExternalLinkIcon() {
  return (
    <svg
      className={styles.externalIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function ProjectBlock({ project }: { project: TimelineProject }) {
  const body = (
    <>
      <div className={styles.projectHeader}>
        <h4 className={styles.projectTitle}>{project.title}</h4>
        {project.period && (
          <span className={styles.projectPeriod}>{project.period}</span>
        )}
      </div>
      {project.role && (
        <p className={styles.projectRole}>{project.role}</p>
      )}
      <p className={styles.projectDescription}>{project.description}</p>
      {project.highlights && project.highlights.length > 0 && (
        <ul className={styles.projectHighlights}>
          {project.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </>
  );

  if (project.href) {
    return (
      <li className={styles.project}>
        <ExternalLink href={project.href} className={styles.projectLink}>
          {body}
        </ExternalLink>
      </li>
    );
  }

  return <li className={styles.project}>{body}</li>;
}

function TimelineCard({
  item,
  side,
  row,
  isActive,
}: {
  item: TimelineEntry;
  side: TimelineSide;
  row: number;
  isActive: boolean;
}) {
  const hasProjects = item.projects && item.projects.length > 0;

  const content = (
    <>
      <div className={styles.cardHeader}>
        <div className={styles.logoWrap}>
          <Image
            src={item.logo}
            alt={`${item.organization} logo`}
            width={40}
            height={40}
            className={styles.logo}
          />
        </div>
        <div className={styles.cardHeading}>
          <span className={styles.typeLabel}>{typeLabels[item.type]}</span>
          <h3 className={styles.cardTitle}>
            {item.title}
            {item.href && <ExternalLinkIcon />}
          </h3>
          <p className={styles.cardOrg}>
            {item.role ? `${item.role} · ${item.organization}` : item.organization}
          </p>
        </div>
        <span className={styles.period}>{item.period}</span>
      </div>
      <p className={styles.cardDescription}>{item.description}</p>
      {!hasProjects && item.highlights && item.highlights.length > 0 && (
        <ul className={styles.highlights}>
          {item.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {hasProjects && (
        <div className={styles.projects}>
          <p className={styles.projectsLabel}>Selected projects</p>
          <ul className={styles.projectList}>
            {item.projects!.map((project) => (
              <ProjectBlock key={project.id} project={project} />
            ))}
          </ul>
        </div>
      )}
    </>
  );

  return (
    <li
      data-id={item.id}
      className={`${styles.item} ${styles[`item${side === "left" ? "Left" : "Right"}`]} ${isActive ? styles.itemActive : ""
        } ${hasProjects ? styles.itemGrouped : ""}`}
      style={{ gridRow: row }}
    >
      <span className={styles.connector} aria-hidden />
      {item.href ? (
        <ExternalLink href={item.href} className={styles.card}>
          {content}
          <span className="sr-only"> (opens in new tab)</span>
        </ExternalLink>
      ) : (
        <article className={styles.card}>{content}</article>
      )}
    </li>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(timelineItems[0]?.id ?? null);
  const yearGroups = useMemo(() => groupTimelineByYear(timelineItems), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;

    const update = () => {
      const items = Array.from(
        section.querySelectorAll<HTMLElement>("li[data-id]")
      );
      if (!items.length) return;

      const anchor = window.innerHeight * 0.38;
      const scrollBottom = window.scrollY + window.innerHeight;
      const docBottom = document.documentElement.scrollHeight;
      const atBottom = scrollBottom >= docBottom - 32;

      let nextActive = items[0];

      if (atBottom) {
        nextActive = items[items.length - 1];
      } else {
        for (const item of items) {
          const { top } = item.getBoundingClientRect();
          if (top <= anchor) {
            nextActive = item;
          } else {
            break;
          }
        }
      }

      const id = nextActive.getAttribute("data-id");
      if (id) setActiveId(id);

      const track = section.querySelector<HTMLElement>(`.${styles.track}`);
      if (!track) return;

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const trackBottom = track.getBoundingClientRect().bottom + window.scrollY;
      const scrollAnchor = window.scrollY + anchor;
      const range = Math.max(trackBottom - trackTop, 1);
      const scrolled = Math.min(Math.max(scrollAnchor - trackTop, 0), range);

      if (atBottom) {
        setProgress(100);
      } else {
        setProgress((scrolled / range) * 100);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="timeline-heading"
    >
      <header className={styles.header}>
        <h2 id="timeline-heading" className={styles.heading}>
          Timeline
        </h2>
      </header>

      <div className={styles.wrapper}>
        <div className={styles.timelineMain}>
          <div className={styles.track} aria-hidden>
            <div className={styles.trackLine} />
            <div
              className={styles.trackProgress}
              style={{ height: `${progress}%` }}
            />
          </div>

          <div className={styles.years}>
            {yearGroups.map((group) => {
              const isYearActive = group.items.some(
                ({ item }) => item.id === activeId,
              );

              return (
                <div key={group.year} className={styles.yearGroup}>
                  <div
                    className={`${styles.yearMarker} ${isYearActive ? styles.yearMarkerActive : ""}`}
                  >
                    <span className={styles.yearDot} />
                    <span className={styles.yearLabel}>{group.year}</span>
                  </div>

                  <ol className={styles.yearItems}>
                    {group.items.map(({ item, side, row }) => (
                      <TimelineCard
                        key={item.id}
                        item={item}
                        side={side}
                        row={row}
                        isActive={activeId === item.id}
                      />
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
