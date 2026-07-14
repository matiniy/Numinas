import { FlowingMenu, type FlowingMenuItem } from '@/components/ui/FlowingMenu'

const pillars: FlowingMenuItem[] = [
  {
    index: '01',
    text: 'Communicate',
    subtext:
      'Deliver clarity fast. Ambitious campaigns become cinematic visuals audiences instantly understand.',
    image: '/media/pillars/communicate.jpg',
  },
  {
    index: '02',
    text: 'Captivate',
    subtext:
      'Win attention in seconds. Explainers, ads, and animations built to cut through noise.',
    image: '/media/pillars/captivate.jpg',
  },
  {
    index: '03',
    text: 'Connect',
    subtext:
      'Build trust and buy-in. Story-driven motion that resonates with customers, teams, and investors.',
    image: '/media/pillars/connect.jpg',
  },
]

export function Pillars() {
  return (
    <section id="pillars" className="wire-section" aria-labelledby="pillars-heading">
      <div className="wire-container mb-8 md:mb-10">
        <h2 id="pillars-heading" className="wire-label">
          Our services
        </h2>
      </div>

      <div className="h-[min(58vh,520px)] min-h-[360px] w-full">
        <FlowingMenu items={pillars} />
      </div>
    </section>
  )
}
