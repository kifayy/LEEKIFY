/* Temporary archetype preview UI (not the real quiz result). */
"use client";

import { useState } from "react";
import Image from "next/image";

type ArchetypePreview = {
  emoji: string;
  name: string;
  imageUrl: string;
  description: string;
  stats: string[];
};

const ARCHETYPES: ArchetypePreview[] = [
  {
    emoji: "💬",
    name: "Flirt",
    imageUrl:
      "https://storage.googleapis.com/images_592/archetype1%20(1).png",
    description:
      "People with this archetype notice someone cute and aren't afraid to strike up a conversation or make a joke. They enjoy meeting new people but also like hanging with friends. Confidence comes and goes, and that's totally normal for them. They notice small gestures that make interactions fun. A smile, a text, or a quick chat in class can make their day feel lively. They often remember little details about people, which makes follow-up conversations easier. Even if things don't go perfectly, they still enjoy putting themselves out there.",
    stats: [
      "💬 Icebreakers",
      "👀 Remember details",
      "📱 Follow-up nudges",
      "✨ Confidence boosts",
      "🎯 Match tips",
    ],
  },
  {
    emoji: "🧠",
    name: "CEO",
    imageUrl:
      "https://storage.googleapis.com/images_592/archetype1%20(2).png",
    description:
      "People with this archetype like having a plan for schoolwork, side projects, or life after graduation. Checking things off a to-do list feels good to them, even if some days get messy. They focus when needed and take breaks with friends when they can. Deadlines motivate them instead of stressing them out. Finishing tasks makes them feel in control, even when life is unpredictable. They enjoy seeing progress and small wins, which keeps them moving forward. Even when plans get sidetracked, they find ways to get back on track without panicking.",
    stats: [
      "📋 Goal tracker",
      "⏰ Deadlines",
      "📊 Progress",
      "🚀 Opportunity alerts",
      "✅ Planning tools",
    ],
  },
  {
    emoji: "🎉",
    name: "Partier",
    imageUrl:
      "https://storage.googleapis.com/images_592/archetype1%20(3).png",
    description:
      "People with this archetype love fun and energy, whether it's campus events, parties, or hanging out with friends. Sometimes making memories wins over staying in, and that's okay. They laugh, joke, and enjoy being in the moment. Even with responsibilities, they find ways to fit in social time. Life feels best to them when it's exciting, even if a bit chaotic. They're usually up for spontaneous plans and last-minute adventures. Even when life gets stressful, they find ways to make it feel light and enjoyable.",
    stats: [
      "🎉 Campus events",
      "👥 Hangouts",
      "⚡ Last-minute plans",
      "📍 Local picks",
      "🔥 Trending",
    ],
  },
  {
    emoji: "🌿",
    name: "Free Spirit",
    imageUrl:
      "https://storage.googleapis.com/images_592/archetype1%20(6).png",
    description:
      "People with this archetype like doing things their way, even if it's not the usual path. Freedom and flexibility matter more than strict schedules. They enjoy quiet moments, small hangouts, or spontaneous adventures. Little joys in everyday life make their days brighter. Being authentic is more important to them than keeping up with everyone else. They often notice things that others overlook, which makes their experiences feel richer. Even if they don't follow a strict plan, they feel content going with the flow.",
    stats: [
      "🌿 Flexible plans",
      "🧭 Path suggestions",
      "🎨 Creative ideas",
      "🌅 Daily inspo",
      "🪶 Low-pressure goals",
    ],
  },
  {
    emoji: "🗺️",
    name: "Explorer",
    imageUrl:
      "https://storage.googleapis.com/images_592/archetype1%20(5).png",
    description:
      "People with this archetype are curious about everything, from clubs and classes to hobbies and random experiences. They balance trying new things with keeping up with schoolwork and friends. Planning helps, but the best experiences often happen unexpectedly. Exploring different things helps them figure out what fits. Learning and discovering keeps life interesting. They enjoy comparing experiences and seeing how different things make them feel. Even if they don't stick with one activity for long, they gain something from every new thing they try.",
    stats: [
      "🔍 Try new things",
      "🧪 Interest quizzes",
      "🗺️ Experience tracker",
      "📚 Explore paths",
      "⚖️ Compare options",
    ],
  },
  {
    emoji: "🎬",
    name: "Main Character",
    imageUrl:
      "https://storage.googleapis.com/images_592/fvas2.png",
    description:
      "People with this archetype take the lead sometimes and step back to observe at other times. They're figuring out what works best for them while balancing classes, friends, and personal projects. They handle surprises and unexpected changes with ease. Uncertainty is just part of life, and they roll with it. Even while figuring things out, they naturally stand out and make an impact. They notice small details others might miss, giving them a unique perspective. Life feels like a story they're creating as they go, which makes it exciting and full of possibility.",
    stats: [
      "🎬 Timeline",
      "🌟 Highlights",
      "📖 Progress story",
      "🧠 Reflection prompts",
      "🔥 Level up",
    ],
  },
];

function PreviewCard({ archetype }: { archetype: ArchetypePreview }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-[22px] border border-[#E8E8E8] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        className="w-full text-left"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded && (
          <div className="relative aspect-[16/10] w-full bg-white">
            <Image
              src={archetype.imageUrl}
              alt=""
              fill
              className="object-contain"
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              {archetype.emoji}
            </span>
            <h3 className="text-lg font-bold text-[#181A1D]">
              {archetype.name}
            </h3>
          </div>

          {expanded && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-[#181A1D]/80">
                {archetype.description}
              </p>

              <ul className="mt-3 flex flex-wrap items-start gap-x-2 gap-y-1.5">
                {archetype.stats.map((s, idx) => {
                  const tagBg = [
                    "bg-[#FDE68A]", // pastel yellow
                    "bg-[#FDBA74]", // pastel orange
                    "bg-[#5EEAD4]", // pastel teal
                    "bg-[#C4B5FD]", // pastel purple
                  ][idx % 4];

                  return (
                  <li
                    key={s}
                    className={`rounded-full ${tagBg} px-2.5 py-1 text-xs sm:text-sm font-medium text-[#181A1D] leading-none shadow-[inset_0_0_0_1px_rgba(149,110,254,0.16)] whitespace-nowrap`}
                  >
                    {s}
                  </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </button>
    </article>
  );
}

export function ArchetypePreviewSection() {
  return (
    <section className="px-4 pb-10 md:pb-14" aria-label="Archetype preview">
      <div className="mx-auto max-w-[1160px]">
        <h2 className="text-center text-2xl font-bold text-[#181A1D] md:text-3xl">
          A few archetypes you can get...
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {ARCHETYPES.map((a) => (
            <PreviewCard key={a.name} archetype={a} />
          ))}

          {/* After the 6th */}
          <div className="relative overflow-hidden rounded-[22px] border border-[#E8E8E8] lg:col-span-3">
            <div className="relative flex min-h-[240px] flex-col items-center justify-center p-6 text-center lg:min-h-[280px]">
              <div className="text-4xl font-black text-[#181A1D]">+ 12</div>
              <div className="mt-1 text-sm font-semibold text-[#181A1D]">
                others
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

