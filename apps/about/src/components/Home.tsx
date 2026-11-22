import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const linkClass = 'text-blue-400 hover:text-blue-300 underline';
const bodyClass = 'text-base sm:text-lg leading-relaxed';

const contactLinks = [
  { href: 'mailto:johnstonliu2004@gmail.com', icon: faEnvelope, label: 'Email' },
  { href: 'https://github.com/JohnstonLiu', icon: faGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/johnston-liu/', icon: faLinkedin, label: 'LinkedIn' },
  { href: 'https://docs.johnstonliu.me', icon: faBook, label: 'Docs' },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden px-4 py-12 sm:px-8 sm:py-16 font-display flex items-center justify-center">
      <main className="max-w-3xl w-full space-y-4 sm:space-y-6">
        <p className={bodyClass}>
          Hi! This is the <span className="line-through">wonderfully designed</span> website of Johnston Liu.
          I'm from Vancouver, Canada, and I'm a machine learning engineer at Suno based in Cambridge, MA. I stare & listen to data, read claude, and make gpus do things. I'm a graduate of the University of Chicago with a double major in Mathematics and Computer Science.
        </p>

        <p className={bodyClass}>
          Prior to moving to machine learning, I worked on our infrastructure team. I spent my time on:
        </p>
        <ol className={`list-decimal pl-6 space-y-2 marker:text-neutral-400 ${bodyClass}`}>
          <li>On-call incident triage and Slack engineering agents (credentialless sandbox w/ bash + cli tools, integrated with existing company tooling, harness-outside-sandbox runtime and Durable Object-style SQLite WAL / S3 state).</li>
          <li>Kubernetes sandbox platform (gVisor isolation, Cilium and Envoy egress controls + credential injection, ~1s cold starts via node image prepulling, warm node buffers, and a node-local CSI git cache).</li>
          <li>Persistent Cloud Hypervisor microVM devboxes (Tailscale, checkpoint/restore migration, live-swappable VM runner upgrades, memory hot-plug, and live resizing).</li>
        </ol>

        <p className={bodyClass}>
          Before all of this, I worked in the Bay Area at Pure Storage on the FlashBlade kernel team getting kernel modules and hardware devices to work. I also built
          an <a href="https://docs.johnstonliu.me/ai-wrappers" className={linkClass}>AI Agent</a> (maybe at some point i'll write this, but quickly became obsolete).
          Before that, I was in NYC at CMS Holdings performing research into trading
          strategies and building research tools in Python. And even before that,
          I did mathematics research on symmetric monoidal preorders and their applications to finite
          topological spaces. The relevant paper (archaic at this point) can be found{' '}
          <a href="/documents/reu_paper.pdf" className={linkClass}>here</a>. If you'd like to contact me, feel free to use any of the links below!
        </p>

        <nav className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-base sm:gap-x-8 sm:text-lg">
          {contactLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              className="text-blue-400 hover:text-blue-300 relative group inline-flex items-center gap-2"
            >
              <FontAwesomeIcon icon={icon} />
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        <footer className="pt-4 sm:pt-6 text-center text-gray-400 text-sm sm:text-base">
          <p>Last Updated 11/21/2026</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
