import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { FaArrowRight, FaBars, FaCode, FaDownload, FaEnvelope, FaExternalLinkAlt, FaGithub, FaGraduationCap, FaLinkedinIn, FaMoon, FaSun, FaTimes, FaUser } from 'react-icons/fa'
import { techStack } from './data/techStack'
import { certifications } from './data/certifications'
import { projects } from './data/projects'

const links = ['Home', 'About', 'Education', 'Skills', 'Certifications', 'Projects', 'Contact']
const sectionId = (name) => name === 'Skills' ? 'tech-stack' : name.toLowerCase().replace(' ', '-')
const social = [
  { icon: FaGithub, href: 'https://github.com/Pauline311', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/pauline-ponon-0b80a9354/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:paulineponon05@gmail.com', label: 'Email' }
]
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: .65, ease: 'easeOut' }
  }
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: .3 }}
      className="mb-10 md:mb-14"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .8, delay: .2, ease: 'easeOut' }}
        className="mt-5 block h-[3px] w-24 origin-left rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
      />
      {copy && <p className="mt-5 max-w-2xl leading-7 text-slate-400">{copy}</p>}
    </motion.div>
  )
}

const codeTokens = [
  { t: '</>', l: '6%', d: 26, delay: 0 },
  { t: '{ }', l: '16%', d: 32, delay: 6 },
  { t: '01', l: '27%', d: 22, delay: 3 },
  { t: 'git', l: '38%', d: 30, delay: 11 },
  { t: '=>', l: '49%', d: 24, delay: 8 },
  { t: 'npm', l: '60%', d: 34, delay: 2 },
  { t: '[ ]', l: '70%', d: 27, delay: 14 },
  { t: '10', l: '80%', d: 23, delay: 5 },
  { t: '</>', l: '90%', d: 31, delay: 9 },
  { t: 'sql', l: '55%', d: 36, delay: 17 },
  { t: ';', l: '33%', d: 29, delay: 13 },
  { t: '#!', l: '75%', d: 28, delay: 19 }
]

function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 200)
      y.set(event.clientY - 200)
    }

    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="absolute left-0 top-0 hidden h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-[90px] lg:block"
    />
  )
}

/* One shared background for the whole page: grid, glowing blobs, floating code, cursor glow */
function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="grid-lines absolute inset-0" />

      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="absolute left-[-4rem] top-[18%] h-56 w-56 rounded-full bg-sky-500/20 blur-[100px] md:left-[6%] md:h-72 md:w-72 md:blur-[110px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        className="absolute right-[-4rem] top-[10%] h-64 w-64 rounded-full bg-violet-600/20 blur-[110px] md:right-[4%] md:h-80 md:w-80 md:blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 60, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        className="absolute bottom-[-4rem] left-[30%] h-64 w-64 rounded-full bg-sky-400/10 blur-[110px]"
      />

      {codeTokens.map((token, i) => (
        <span
          key={i}
          className={`code-float absolute font-mono text-sm md:text-base ${
            i % 2 ? 'text-violet-400/25' : 'text-sky-400/25'
          }`}
          style={{
            left: token.l,
            bottom: '-2rem',
            animationDuration: `${token.d}s`,
            animationDelay: `-${token.delay}s`
          }}
        >
          {token.t}
        </span>
      ))}

      <CursorGlow />
    </div>
  )
}

/* Scrolling strip of tech names */
function TechMarquee() {
  const items = [...techStack, ...techStack, ...techStack, ...techStack]

  return (
    <div className="marquee relative overflow-hidden border-y border-white/5 py-4" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="mr-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-slate-300"
          >
            <item.icon className="text-sky-300" />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const [typed, setTyped] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 1024)
  const [profileOpen, setProfileOpen] = useState(false)
  const [certificateOpen, setCertificateOpen] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const phrases = [
    'BS Information Technology Student',
    'Aspiring Software Developer',
    'Frontend Developer',
    'UI/UX Enthusiast'
  ]

  useEffect(() => {
    let phrase = 0
    let char = 0
    let deleting = false
    let pausing = false

    const timer = setInterval(() => {
      const current = phrases[phrase]

      char = deleting
        ? Math.max(char - 1, 0)
        : Math.min(char + 1, current.length)

      setTyped(current.slice(0, char))

      if (!deleting && char === current.length && !pausing) {
        pausing = true
        setTimeout(() => {
          deleting = true
          pausing = false
        }, 1100)
      }

      if (deleting && char === 0) {
        deleting = false
        phrase = (phrase + 1) % phrases.length
      }
    }, deleting ? 38 : 72)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const updateLayout = () => setIsCompact(window.innerWidth < 1024)

    window.addEventListener('resize', updateLayout)

    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      let closest = 'Home'

      links.forEach(link => {
        const el = document.getElementById(sectionId(link))

        if (el && window.scrollY >= el.offsetTop - 160) {
          closest = link
        }
      })

      setActive(closest)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false)
        setCertificateOpen(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const go = (name) => {
    document.getElementById(sectionId(name))?.scrollIntoView({
      behavior: 'smooth'
    })

    setMenuOpen(false)
    setProfileOpen(false)
  }

  return (
    <div className={`overflow-hidden ${theme === 'light' ? 'theme-light' : ''}`}>
      <motion.div
        className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-gradient-to-r from-sky-400 to-violet-500"
        style={{ scaleX }}
      />

      <BackgroundFX />

      <Navbar
        active={active}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        go={go}
        scrolled={scrolled}
        theme={theme}
        toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      <main className="relative z-10">

        {/* HERO */}
        <section
          id="home"
          className="relative overflow-hidden pt-24 md:min-h-screen md:pt-28"
        >
          <div className="section hero-section relative flex items-center md:min-h-[calc(100vh-7rem)]">

            <div className="hero-layout grid w-full items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: .12 }
                  }
                }}
                className="hero-copy min-w-0"
              >

                <motion.div
                  variants={reveal}
                  className="hero-badge mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-xs text-sky-200 sm:mb-5 sm:px-4 sm:text-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available for meaningful opportunities
                </motion.div>

                <motion.p
                  variants={reveal}
                  className="hero-hello font-mono text-sm text-sky-300"
                >
                  Hello, I’m
                </motion.p>

                <motion.h1
                  variants={reveal}
                  className="hero-name mt-2 text-5xl font-extrabold tracking-[-.055em] text-white sm:mt-3 sm:text-6xl lg:text-7xl"
                >
                  Pauline
                  <br />
                  <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
                    Ponon.
                  </span>
                </motion.h1>

                <motion.div
                  variants={reveal}
                  className="hero-typed mt-5 flex min-h-8 items-center font-mono text-base text-violet-200 sm:mt-6"
                >
                  <span>{typed}</span>
                  <span className="ml-1 h-5 w-[2px] animate-pulse bg-sky-300" />
                </motion.div>

                <motion.p
                  variants={reveal}
                  className="hero-desc mt-4 max-w-xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8 sm:text-slate-400"
                >
                  I create thoughtful digital experiences at the intersection of clean code, useful technology, and human-centered design.
                </motion.p>

                <motion.div
                  variants={reveal}
                  className="hero-actions mt-6 grid grid-cols-2 gap-3 sm:mt-9 sm:flex sm:flex-wrap"
                >
                  <button
                    onClick={() => go('Projects')}
                    className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-4 text-base font-semibold text-slate-950 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/25 sm:col-span-1 sm:py-3"
                  >
                    View my projects
                    <FaArrowRight />
                  </button>

                  <button
                    onClick={() => go('Certifications')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-4 text-sm font-semibold text-white transition hover:border-sky-300/50 hover:bg-white/5 sm:px-5 sm:py-3 sm:text-base"
                  >
                    View certifications
                  </button>

                  <a
                    href={`${import.meta.env.BASE_URL}Pauline_Ponon.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-4 text-sm font-semibold text-white transition hover:border-violet-300/50 hover:bg-white/5 sm:px-5 sm:py-3 sm:text-base"
                  >
                    <FaDownload />
                    Resume
                  </a>
                </motion.div>

                <motion.div
                  variants={reveal}
                  className="hero-social mt-6 flex items-center gap-3 sm:mt-10"
                >
                  {social.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-lg text-slate-300 transition hover:-translate-y-1 hover:border-sky-400/50 hover:text-sky-300 sm:h-11 sm:w-11"
                    >
                      <Icon />
                    </a>
                  ))}

                  <span className="ml-1 font-mono text-[11px] leading-4 text-slate-400 sm:ml-2 sm:text-xs sm:text-slate-500">
                    Based in the Philippines
                  </span>
                </motion.div>

              </motion.div>

              {/* PROFILE IMAGE */}
              <motion.button
                type="button"
                onClick={() => setProfileOpen(true)}
                aria-label="Open Pauline's profile"
                initial={{ opacity: 0, scale: .9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: .25, duration: .8 }}
                className="hero-image group relative ml-auto w-full max-w-sm text-left"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: 'easeInOut'
                  }}
                  className="hero-frame relative overflow-hidden rounded-[2rem] p-[2px] shadow-2xl shadow-sky-950 transition duration-300 group-hover:scale-[1.02]"
                >
                  <span className="spin-ring" aria-hidden="true" />
                  <div className="profile-photo relative overflow-hidden rounded-[1.9rem] bg-slate-900 p-3">
                    <img
                      src={`${import.meta.env.BASE_URL}pauline-2026.png`}
                      alt="Pauline Ponon"
                      className="w-full rounded-[1.5rem]"
                    />
                  </div>
                </motion.div>

                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                  className="absolute -left-6 top-10 hidden items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 font-mono text-xs text-sky-300 shadow-lg backdrop-blur md:inline-flex"
                >
                  <FaCode /> React
                </motion.span>

                <motion.span
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
                  className="absolute -right-4 bottom-24 hidden items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 font-mono text-xs text-violet-300 shadow-lg backdrop-blur md:inline-flex"
                >
                  {'{ }'} UI/UX
                </motion.span>

                <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950/75 px-3 py-2 text-xs font-medium text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <FaUser />
                  View profile
                </span>
              </motion.button>

            </div>
          </div>
        </section>

        <TechMarquee />
        <About />
        <Education />
        <Tech />
        <Certificates compact={isCompact} onOpen={setCertificateOpen} />
        <Projects />
        <Contact />

      </main>

      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onGo={go}
        theme={theme}
      />

      <CertificateModal
        certificate={certificateOpen}
        onClose={() => setCertificateOpen(null)}
      />
    </div>
  )
}

function Navbar({
  active,
  menuOpen,
  setMenuOpen,
  go,
  scrolled,
  theme,
  toggleTheme
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || menuOpen
          ? 'border-b border-white/10 bg-slate-950/85 py-3 backdrop-blur-xl'
          : 'py-4 md:py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">

        <button
          onClick={() => go('Home')}
          className="font-mono text-2xl font-bold tracking-tight text-white lg:text-lg"
        >
          PP<span className="text-sky-300">.</span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(link => (
            <button
              key={link}
              onClick={() => go(link)}
              className={`relative rounded-lg px-3 py-2 text-sm transition ${
                active === link ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {active === link && (
                <motion.span
                  layoutId="nav-active"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-lg bg-white/10"
                />
              )}
              <span className="relative">{link}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 lg:gap-2">

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="group relative grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-xl text-sky-300 transition hover:-translate-y-0.5 hover:border-sky-300/60 lg:h-10 lg:w-10 lg:text-base"
            title="Change theme"
          >
            <motion.span
              initial={false}
              animate={{
                rotate: 0,
                scale: theme === 'dark' ? 1 : .9
              }}
              transition={{ duration: .25 }}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </motion.span>

            <span className="absolute -bottom-8 hidden whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-[10px] text-white group-hover:lg:block">
              {theme === 'dark' ? 'Light mode' : 'Night mode'}
            </span>
          </button>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-xl text-white lg:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: .2 }}
            className="glass mx-5 mt-3 max-h-[70vh] overflow-y-auto rounded-2xl p-2 lg:hidden"
          >
            {links.map(link => (
              <button
                key={link}
                onClick={() => go(link)}
                className={`block w-full rounded-xl px-4 py-4 text-left text-lg font-medium ${
                  active === link
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function About() {
  const cards = [
    ['Education', 'BS Information Technology student'],
    ['Career goal', 'Building useful software with care'],
    ['Interests', 'Frontend, UI/UX & databases'],
    ['Soft skills', 'Curious, collaborative, adaptable']
  ]

  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-4xl">

        <SectionHeading
          eyebrow="01 / About me"
          title="Curiosity is where every great build begins."
        />

        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="-mt-5 max-w-2xl leading-8 text-slate-400"
        >
          My name is Pauline Ponon and I am currently pursuing a Bachelor of Science in Information Technology. I enjoy developing responsive web applications, mobile applications, and software solutions that solve real-world problems. I am passionate about frontend development, UI/UX design, databases, and continuously improving my technical skills through projects and certifications.
        </motion.p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {cards.map(([title, body], i) => (
            <motion.div
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * .08 }}
              viewport={{ once: true }}
              key={title}
              className="glass rounded-2xl p-5"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-sky-300">
                {title}
              </p>
              <p className="mt-3 font-medium text-slate-200">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="border-y border-white/5">
      <div className="section">

        <SectionHeading
          eyebrow="02 / Education"
          title="Building a strong technical foundation."
          copy="An academic journey shaped by disciplined learning, project work, and a drive to keep improving."
        />

        <div className="relative ml-3 border-l border-sky-400/30 pl-8 md:ml-8 md:pl-12">

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-7"
          >

            <span className="absolute -left-[45px] top-8 grid h-6 w-6 place-items-center rounded-full border-4 border-slate-950 bg-sky-400 md:-left-[61px]" />

            <div className="flex flex-wrap items-start justify-between gap-3">

              <div>
                <p className="eyebrow">Present</p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Bachelor of Science in Information Technology
                </h3>
              </div>

              <FaGraduationCap className="text-3xl text-violet-300" />

            </div>

            <div className="mt-7 grid gap-5 text-sm sm:grid-cols-3">

              {[
                ['Current focus', 'Software development & UI/UX'],
                ['Recognition', 'DBP Scholar'],
                ['Coursework', 'Programming, databases, networking']
              ].map(([a, b]) => (
                <div key={a}>
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                    {a}
                  </p>

                  <p className="mt-2 leading-6 text-slate-300">
                    {b}
                  </p>
                </div>
              ))}

            </div>

            <p className="mt-7 rounded-xl border border-white/5 bg-white/[.03] px-4 py-3 text-sm text-slate-400">
              St. Dominic College of Asia 2023-2027.
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Tech() {
  const categories = [...new Set(techStack.map(t => t.category))]

  return (
    <section id="tech-stack" className="section">

      <SectionHeading
        eyebrow="03 / Tech stack"
        title="Tools I use to turn ideas into products."
        copy="A growing toolkit across web, mobile, databases, and collaborative development."
      />

      {categories.map(category => (
        <div className="mb-10" key={category}>

          <h3 className="mb-4 font-mono text-sm text-slate-400">
            {category}
          </h3>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

            {techStack
              .filter(t => t.category === category)
              .map((item, i) => (
                <motion.div
                  whileHover={{
                    y: -7,
                    rotateX: 2,
                    rotateY: -2
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * .04 }}
                  viewport={{ once: true }}
                  key={item.name}
                  className="card-shine group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-sky-400/40 hover:shadow-xl hover:shadow-sky-950"
                >
                  <item.icon style={{ animationDelay: `${i * .2}s` }} className="icon-float text-3xl text-sky-300 transition group-hover:text-violet-300" />

                  <h4 className="mt-5 font-semibold text-white">
                    {item.name}
                  </h4>
                </motion.div>
              ))}

          </div>
        </div>
      ))}
    </section>
  )
}

function Certificates({ compact, onOpen }) {
  const burstOffsets = [
    [-140, -180, -10],
    [0, -210, 8],
    [140, -180, -7],
    [-110, 170, 9],
    [110, 170, -9]
  ]

  return (
    <section
      id="certifications"
      className="border-y border-white/5"
    >
      <div className="section">

        <SectionHeading
          eyebrow="04 / Certifications"
          title="Learning with intention, validating with effort."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {certifications.map((cert, i) => {

            const [x, y, rotate] =
              burstOffsets[i % burstOffsets.length]

            return (
              <motion.article
                key={cert.title}
                whileHover={{ y: -7 }}
                initial={
                  compact
                    ? {
                        opacity: 0,
                        scale: .7,
                        x,
                        y,
                        rotate
                      }
                    : {
                        opacity: 0,
                        scale: .96
                      }
                }
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0
                }}
                transition={
                  compact
                    ? {
                        type: 'spring',
                        stiffness: 150,
                        damping: 13,
                        delay: i * .08
                      }
                    : {
                        delay: i * .08
                      }
                }
                viewport={{
                  once: true,
                  amount: .22
                }}
                className="card-shine group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 hover:border-sky-400/40"
              >

                <button
                  type="button"
                  onClick={() => onOpen(cert)}
                  className="relative block aspect-[16/8] w-full overflow-hidden border-b border-white/10 bg-slate-950 text-left"
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} preview`}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent opacity-0 transition group-hover:opacity-100" />

                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-slate-950/70 px-3 py-2 text-xs font-medium text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                    View full image
                    <FaExternalLinkAlt />
                  </span>
                </button>

                <div className="p-6">

                  <p className="text-xs font-medium uppercase tracking-wider text-sky-300">
                    {cert.organization} · {cert.date}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {cert.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => onOpen(cert)}
                    className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-medium text-slate-300 transition hover:text-sky-300"
                  >
                    View certificate
                    <FaExternalLinkAlt className="text-xs" />
                  </button>

                </div>

              </motion.article>
            )
          })}

        </div>
      </div>
    </section>
  )
}

function ProfileModal({ open, onClose, onGo }) {
  return (
    <AnimatePresence>

      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Pauline Ponon profile"
          onMouseDown={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop fixed inset-0 z-[100] grid place-items-center p-4"
        >

          <motion.div
            onMouseDown={event => event.stopPropagation()}
            initial={{
              opacity: 0,
              y: 20,
              scale: .96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 16,
              scale: .96
            }}
            className="modal-card relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
          >

            <button
              onClick={onClose}
              aria-label="Close profile preview"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-xl border border-white/10 text-white hover:border-sky-300"
            >
              <FaTimes />
            </button>

            <div className="profile-modal-photo relative mx-auto w-44 overflow-hidden rounded-2xl border border-sky-300/40 p-1">
              <img
                src={`${import.meta.env.BASE_URL}pauline-2026.png`}
                alt="Pauline Ponon"
                className="rounded-xl"
              />
            </div>

            <p className="mt-5 text-center font-mono text-xs uppercase tracking-[.2em] text-sky-300">
              Profile
            </p>

            <h2 className="mt-2 text-center text-3xl font-bold text-white">
              Pauline Ponon
            </h2>

            <p className="mt-2 text-center text-slate-400">
              BSIT Student | Aspiring IT Professional
            </p>

            <p className="mt-5 text-center leading-7 text-slate-300">
              A fourth-year BSIT student interested in thoughtful digital solutions, system analysis, and continuously building practical technology skills.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">

              {[
                'About',
                'Skills',
                'Projects',
                'Certifications',
                'Contact'
              ].map(name => (
                <button
                  key={name}
                  onClick={() => onGo(name)}
                  className="rounded-xl border border-white/10 px-3 py-4 text-sm text-slate-200 transition hover:border-sky-300 hover:text-sky-300"
                >
                  {name}
                </button>
              ))}

            </div>
          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  )
}

function CertificateModal({ certificate, onClose }) {
  return (
    <AnimatePresence>

      {certificate && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${certificate.title} certificate`}
          onMouseDown={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop fixed inset-0 z-[100] grid place-items-center p-3 md:p-8"
        >

          <motion.div
            onMouseDown={event => event.stopPropagation()}
            initial={{
              opacity: 0,
              scale: .96
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: .96
            }}
            className="modal-card relative max-h-full w-full max-w-6xl overflow-auto rounded-2xl border border-white/10 bg-slate-900 p-4"
          >

            <div className="mb-3 flex items-center justify-between gap-4">

              <div>
                <p className="text-xs uppercase tracking-widest text-sky-300">
                  {certificate.organization} · {certificate.date}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  {certificate.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close certificate preview"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 text-white hover:border-sky-300"
              >
                <FaTimes />
              </button>

            </div>

            <img
              src={certificate.image}
              alt={certificate.title}
              className="mx-auto max-h-[72vh] w-auto max-w-full rounded-lg bg-white object-contain"
            />

            <button
              onClick={onClose}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-sky-300"
            >
              Back to certifications
            </button>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">

      <SectionHeading
        eyebrow="05 / Selected work"
        title="Concepts made tangible through thoughtful execution."
        copy="A selection of projects where I combined product thinking, interface design, and development."
      />

      <div className="space-y-7">

        {projects.map((project) => (
          <motion.article
            key={project.title}
            initial={{
              opacity: 0,
              y: 28
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{ once: true }}
            className="card-shine overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 lg:grid lg:grid-cols-[.85fr_1.15fr]"
          >

            <div
              className={`project-visual relative min-h-64 overflow-hidden bg-gradient-to-br ${project.gradient} p-7`}
            >
              <span className="scan-line" aria-hidden="true" />

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
                  backgroundSize: '22px 22px'
                }}
              />

              <span className="relative font-mono text-sm text-white/75">
                {project.number}
              </span>

              <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/20 bg-slate-950/25 p-5 backdrop-blur-sm">

                <FaCode className="text-2xl text-white" />

                <p className="mt-5 font-mono text-xs uppercase tracking-widest text-white/70">
                  Case study
                </p>

                <p className="mt-1 text-xl font-bold text-white">
                  {project.title}
                </p>

              </div>
            </div>

            <div className="p-7 lg:p-9">

              <p className="font-mono text-xs uppercase tracking-widest text-sky-300">
                {project.type}
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
                {project.title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">

                {project.tech.map(t => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}

              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                    Challenge
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {project.challenge}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                    Solution
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {project.solution}
                  </p>
                </div>

              </div>

              <ul className="mt-6 grid gap-2 sm:grid-cols-3">

                {project.features.map(f => (
                  <li
                    key={f}
                    className="text-sm text-slate-300 before:mr-2 before:text-sky-300 before:content-['↗']"
                  >
                    {f}
                  </li>
                ))}

              </ul>

            </div>

          </motion.article>
        ))}

      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section pt-12">

      <div className="relative overflow-hidden rounded-[2rem] border border-sky-300/20 bg-gradient-to-br from-sky-500/15 via-slate-900 to-violet-500/15 px-7 py-16 text-center md:px-14">

        <div className="absolute left-1/3 top-0 h-40 w-40 rounded-full bg-sky-400/20 blur-[80px]" />

        <p className="eyebrow relative">
          06 / Get in touch
        </p>

        <h2 className="relative mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          Let’s build something amazing together.
        </h2>

        <p className="relative mx-auto mt-5 max-w-xl leading-7 text-slate-400">
          I’m always open to learning opportunities, collaboration, and conversations about creating useful technology.
        </p>

        <div className="relative mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">

          {social.map(({ icon: Icon, href, label }) => (
            <a
              href={href}
              key={label}
              target="_blank"
              rel="noreferrer"
              className="card-shine group rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition hover:-translate-y-1 hover:border-sky-300/50"
            >
              <Icon className="mx-auto text-xl text-sky-300" />

              <p className="mt-3 font-medium text-white">
                {label}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Connect with me
              </p>
            </a>
          ))}

        </div>
      </div>
    </section>
  )
}

export default App