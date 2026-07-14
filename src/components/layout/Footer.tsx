export function Footer() {
  return (
    <footer className="wire-section border-b-0">
      <div className="wire-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="wire-label">Footer</p>
          <p className="type-brand">Numinas</p>
          <a
            href="mailto:collab@numinas.studio"
            className="type-small mt-2 block text-[var(--n-mist)] hover:text-[var(--n-paper)]"
          >
            collab@numinas.studio
          </a>
        </div>
        <nav className="type-small flex flex-wrap gap-4 text-[var(--n-mist)]" aria-label="Footer">
          <a href="#projects" className="hover:text-[var(--n-paper)]">
            Work
          </a>
          <a href="#services" className="hover:text-[var(--n-paper)]">
            Services
          </a>
          <a href="#contact" className="hover:text-[var(--n-paper)]">
            Contact
          </a>
        </nav>
        <p className="font-mono text-xs text-[var(--n-mist)]">© {new Date().getFullYear()} Numinas</p>
      </div>
    </footer>
  )
}
