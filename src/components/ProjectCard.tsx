import Link from 'next/link';
import common from '@/styles/common.module.scss';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  href?: string;
  image?: string;
  imageAlt?: string;
}

export default function ProjectCard({
  title,
  category,
  description,
  tags,
  year,
  href,
  image,
  imageAlt,
}: ProjectCardProps) {
  const cardContent = (
    <>
      <div className={styles.imageContainer}>
        {image ? (
          <img src={image} alt={imageAlt || title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.imagePlaceholderText}>Project Image</span>
          </div>
        )}
        <span className={styles.year}>{year}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={common.cardTitle}>{title}</h3>
        <p className={common.cardDescription}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={common.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const cardClassName = `${common.card} ${common.cardSurface} ${styles.card}`;

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClassName}>{cardContent}</div>;
}

