"use client";

import { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "project.1",
    image: "/ai-interviewer.png",
    color: "from-blue-600/20 to-transparent",
    github: "https://github.com/nicogarzonhub/AI-Technical-Interviewer",
  },
  {
    id: "project.2",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    color: "from-blue-500/20 to-transparent",
  },
  {
    id: "project.3",
    image: "/agent-cma.png",
    color: "from-sky-600/20 to-transparent",
    github: "https://github.com/nicogarzonhub/FINANCE-AGENT/tree/main",
  },
  {
    id: "project.4",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    color: "from-cyan-600/20 to-transparent",
    comingSoon: true,
  },
  {
    id: "project.5",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    color: "from-blue-800/20 to-transparent",
    comingSoon: true,
  },
  {
    id: "project.6",
    image: "/pegasus-mechanics.png",
    color: "from-orange-600/20 to-transparent",
    github: "https://github.com/pegasusAuteco/pegasusSolucionAuteco.git",
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          overwrite: "auto",
        }
      );

      const cardArray = Array.from(cards);
      cardArray.forEach((card) => {
        const img = card.querySelector("img");
        if (!img) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(img, {
              y: progress * 30 - 15,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-50">
            {t("projects.title")}
          </h2>
          <p className="mt-4 text-blue-300/70 max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col relative rounded-2xl overflow-hidden border border-blue-900/30 bg-blue-950/20 hover:border-blue-700/50 hover:bg-blue-900/10 transition-all duration-500"
            >
              <div className="relative h-52 shrink-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={t(`${project.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                {project.comingSoon && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full backdrop-blur-sm border border-yellow-500/30">
                      {t("projects.comingSoon")}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-blue-50 group-hover:text-blue-300 transition-colors">
                  {t(`${project.id}.title`)}
                </h3>
                <p className="mt-3 text-sm text-blue-300/60 leading-relaxed flex-1">
                  {t(`${project.id}.desc`)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {t(`${project.id}.tags`)
                    .split(", ")
                    .map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                {!project.comingSoon && (
                  <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t border-blue-900/30">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                      <ExternalLink size={14} />
                      {t("projects.view")}
                    </span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-blue-300 transition-colors"
                      >
                        <Code2 size={14} />
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
