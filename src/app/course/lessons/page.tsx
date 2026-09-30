import type { Metadata } from "next";
import { CourseShell } from "@/components/course";
import { LessonPlayButton } from "@/components/lesson-play";

export const metadata: Metadata = { title: "Lessons — ByteSpace" };

const modules = [
  {
    title: "Module 1: Introduction to Digital Assets",
    body: "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
  },
  {
    title: "Module 2: Design Principles for Impact",
    body: "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
  },
  {
    title: "Module 4: User-Centric Design Strategies",
    body: "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
  },
  {
    title: "Module 5: Interactive Media and Engagement",
    body: "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
  },
  {
    title: "Module 6: Project Showcase and Critique",
    body: "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
  },
  {
    title: "Module 7: Optimizing Digital Assets for Various Platforms",
    body: "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
  },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[20px] leading-[24px] font-semibold tracking-[-0.01em] text-neutral-950">
      {children}
    </h2>
  );
}

export default function LessonsPage() {
  return (
    <CourseShell activeTab="lessons" tabPtClass="lg:pt-[79px]" bodyPbClass="lg:pb-[83px]" bodyWidthClass="min-[1440px]:w-[723px]">
      <div className="flex flex-col gap-6">
        <Heading>Explore the Modules</Heading>
        <p className="text-[16px] leading-[26px] text-neutral-700">
          Immerse yourself in the course content as we break down each module into comprehensive
          lessons, providing practical insights and hands-on experiences.
        </p>

        <div className="flex flex-col gap-6">
          <Heading>Lesson List</Heading>
          <div className="flex flex-col gap-6">
            {modules.map((module) => (
              <div key={module.title} className="flex items-start gap-[13px]">
                <LessonPlayButton title={module.title} />
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] leading-[19px] font-medium text-neutral-950">{module.title}</p>
                  <p className="max-w-[638px] text-[16px] leading-[26px] text-neutral-700">{module.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Heading>Lesson Content</Heading>
          <p className="text-[16px] leading-[26px] text-neutral-700">
            Engage with each lesson through captivating video content, detailed textual explanations,
            and interactive elements. Download resources, complete assignments, and test your
            understanding with quizzes.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Heading>Lesson Progress Tracking</Heading>
          <p className="text-[16px] leading-[26px] text-neutral-700">
            Witness your growth as you complete lessons, with an intuitive progress tracking feature
            guiding you through your learning journey.
          </p>

          <div className="flex flex-col gap-2 rounded-[16px] border border-hairline bg-white p-[15px]">
            <p className="text-[14px] leading-[17px] font-medium text-neutral-950">Learning Progress</p>
            <p className="font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-neutral-950">
              55%
            </p>
            <div className="h-2 w-full rounded-[24px] bg-neutral-100">
              <div className="h-2 w-[56%] rounded-[24px] bg-secondary-400" />
            </div>
          </div>
        </div>
      </div>
    </CourseShell>
  );
}
