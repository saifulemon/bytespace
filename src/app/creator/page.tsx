import type { Metadata } from "next";
import Image from "next/image";
import { CreatorCourses, FollowRow } from "@/components/creator-view";
import { GridBackdrop } from "@/components/decor";
import { Footer, Header, HeaderSlot } from "@/components/site";
import { images } from "@/data/site";

export const metadata: Metadata = { title: "PurePearl Studio — ByteSpace" };

const bio = `Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!
Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.`;

export default function CreatorPage() {
  return (
    <>
      <Header />
      <section className="relative isolate w-full overflow-hidden bg-primary-800">
        <GridBackdrop />
        <HeaderSlot />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-[52px] pb-[82px] lg:px-[122px]">
          <div className="flex flex-col gap-10 min-[1440px]:w-[1198px]">
            <div className="flex items-start gap-6">
              <Image
                src={images.avatar96}
                alt="PurePearl Studio"
                width={96}
                height={96}
                className="size-24 shrink-0 rounded-[24px] object-cover"
              />

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-heading text-[28px] leading-[34px] font-semibold tracking-[-0.01em] text-neutral-50 md:text-[36px] md:leading-[43px]">
                    PurePearl Studio
                  </h1>
                  <span className="inline-flex h-[35px] items-center rounded-[24px] bg-secondary-400 px-6 text-[16px] leading-[19px] font-medium text-neutral-950">
                    Creator
                  </span>
                </div>
                <p className="text-[18px] leading-[29px] text-neutral-50">
                  Passionate UI/UX, Web designer
                </p>
              </div>
            </div>

            <p className="whitespace-pre-line text-[18px] leading-[29px] text-neutral-50">{bio}</p>
          </div>

          <FollowRow />
        </div>
      </section>

      <CreatorCourses />

      <Footer />
    </>
  );
}
