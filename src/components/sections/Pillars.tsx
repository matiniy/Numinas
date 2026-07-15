interface Pillar {
  index: string
  title: string
  body: string
  image?: string
}

const pillars: Pillar[] = [
  {
    index: '01',
    title: 'Communicate',
    body: 'Deliver clarity fast. Ambitious campaigns become cinematic visuals audiences instantly understand.',
    image: '/media/pillars/communicate.jpg',
  },
  {
    index: '02',
    title: 'Captivate',
    body: 'Win attention in seconds. Explainers, ads, and animations built to cut through noise.',
    image: '/media/pillars/captivate.jpg',
  },
  {
    index: '03',
    title: 'Connect',
    body: 'Build trust and buy-in. Story-driven motion that resonates with customers, teams, and investors.',
    image: '/media/pillars/connect.jpg',
  },
]

function PillarVisual({ pillar }: { pillar: Pillar }) {
  return (
    <div className="pillars-grid__cell pillars-grid__cell--visual">
      {pillar.image ? (
        <img
          src={pillar.image}
          alt=""
          className="pillars-grid__image"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      <span className="sr-only">{pillar.title} visual</span>
    </div>
  )
}

function PillarCopy({ pillar }: { pillar: Pillar }) {
  return (
    <article className="pillars-grid__cell pillars-grid__cell--copy" aria-labelledby={`pillar-${pillar.index}`}>
      <p className="pillars-grid__index">{pillar.index}</p>
      <h3 id={`pillar-${pillar.index}`} className="pillars-grid__title">
        {pillar.title}
      </h3>
      <p className="pillars-grid__body">{pillar.body}</p>
    </article>
  )
}

export function Pillars() {
  const [communicate, captivate, connect] = pillars

  return (
    <section
      id="pillars"
      className="pillars-section wire-section"
      aria-label="Communicate, Captivate, Connect"
    >
      <div className="pillars-grid">
        <PillarVisual pillar={communicate} />
        <PillarCopy pillar={communicate} />
        <PillarVisual pillar={captivate} />
        <PillarCopy pillar={captivate} />
        <PillarVisual pillar={connect} />
        <PillarCopy pillar={connect} />
      </div>
    </section>
  )
}
