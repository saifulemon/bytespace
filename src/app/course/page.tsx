import type { Metadata } from "next";
import Image from "next/image";
import { CourseShell } from "@/components/course";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Build Digital Asset: A Comprehensive Guide — ByteSpace" };

const description = `Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.

In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.

As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.`;

const sneakPeaks = [
  "/images/a7c9406f_167x125.png",
  "/images/d443b521_167x125.png",
  "/images/2e1b62a2_167x125.png",
  "/images/0c176267_167x125.png",
];

const keyPoints = [
  "Foundational Concepts",
  "Design Principles Mastery",
  "Advanced Techniques in Digital Creation",
  "Project Showcase and Critique",
  "Optimizing for Various Platforms",
  "Digital Asset Management Best Practices",
  "Monetization Strategies",
  "Capstone Project: Building Your Portfolio",
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[20px] leading-[24px] font-semibold tracking-[-0.01em] text-neutral-950">
      {children}
    </h2>
  );
}

export default function CoursePage() {
  return (
    <CourseShell activeTab="about" tabPtClass="lg:pt-[63px]" bodyPbClass="lg:pb-[64px]">
      <div className="flex flex-col gap-6">
        <Heading>Description</Heading>
        <p className="whitespace-pre-line text-[16px] leading-[26px] text-neutral-700">{description}</p>

        <div className="flex flex-col gap-6">
          <Heading>Sneak Peak</Heading>
          <div className="grid grid-cols-2 gap-[19px] md:grid-cols-4">
            {sneakPeaks.map((src) => (
              <div key={src} className="relative aspect-[167/125] overflow-hidden rounded-[16px] bg-neutral-100">
                <Image src={src} alt="" fill sizes="167px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Heading>Key Points</Heading>
          <ul className="flex flex-col gap-3">
            {keyPoints.map((point) => (
              <li key={point} className="flex h-[26px] items-center gap-2">
                <span className="grid size-6 shrink-0 place-items-center">
                  <span className="grid size-5 place-items-center rounded-full bg-primary-800">
                    <CheckIcon className="size-3 text-white" />
                  </span>
                </span>
                <span className="text-[16px] leading-[26px] text-neutral-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CourseShell>
  );
}
