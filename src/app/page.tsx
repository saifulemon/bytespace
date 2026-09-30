import Image from "next/image";
import Link from "next/link";
import { CategoryIcon, CheckIcon, StarIcon } from "@/components/icons";
import { Container, Footer, Header, HeaderSlot, SectionHeading } from "@/components/site";
import { HeroSearchBar } from "@/components/forms";
import { GlowBlob, GridBackdrop, Logoipsum, Ornament } from "@/components/decor";
import { CourseCard } from "@/components/CourseCard";
import { avatars, courses, images } from "@/data/site";

const tabRows = [
  ["Featured", "Music", "Drawing & Painting", "Marketing", "Animation", "Social Media", "UI/UX Design", "Creative Marketing"],
  ["Digital Illustration", "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", "Photography"],
  ["Productivity", "Web Development", "Data Science", "Cooking", "+ More"],
];

const categories = [
  "development",
  "it",
  "business",
  "marketing",
  "photography",
  "development",
] as const;
const categoryLabels = ["Design", "Development", "IT & Software", "Business", "Marketing", "Photography"];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: avatars.testimonial.sarah,
    quote:
      '"ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning."',
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: avatars.testimonial.james,
    quote:
      "\"I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.\"",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: avatars.testimonial.alex,
    quote:
      "\"As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.\"",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Partners />
      <CourseShowcase />
      <CategoriesSection />
      <GrowthSection />
      <CreatorCta />
      <Testimonials />
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-primary-800">
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px]">
        <GridBackdrop />

        <div
          aria-hidden
          className="absolute rounded-full border-[320px] border-secondary-500"
          style={{ left: 145, top: 582, width: 1149, height: 1149 }}
        />

        <div className="hidden lg:block">
          <Ornament src="/images/e3b55902_387x387.png" color="lime" style={{ left: -118, top: 221, width: 385, height: 385 }} />
          <Ornament src="/images/e3b55902_387x387.png" color="white" style={{ left: 183, top: 477, width: 175, height: 175 }} />
          <Ornament src="/images/8670b841_344x344.png" style={{ left: 18, top: 682, width: 342, height: 342 }} />
          <Ornament src="/images/92fc70a3_372x372.png" color="lime" style={{ right: -161, top: 221, width: 370, height: 370 }} />
          <Ornament src="/images/f9c0e0fd_189x189.png" style={{ right: 146, top: 464, width: 188, height: 188 }} />
          <Ornament src="/images/cda676fe_332x332.png" style={{ right: -17, top: 672, width: 330, height: 330 }} />
        </div>

        <HeaderSlot />

        <div className="absolute inset-x-0 top-[169px] flex flex-col items-center gap-[60px] px-6 text-center">
          <div className="flex max-w-[935px] flex-col items-center gap-8">
            <h1 className="font-heading text-[40px] leading-[46px] font-semibold tracking-[-0.01em] text-white md:text-[56px] md:leading-[64px] lg:text-[72px] lg:leading-[86px]">
              Get Access to Hundreds Courses Available
            </h1>
            <p className="max-w-[819px] text-[16px] leading-[26px] text-neutral-100 lg:text-[18px] lg:leading-[29px]">
              Unlock your creativity, gain valuable knowledge, and grow your business with our wide
              range of courses.
            </p>
          </div>

          <HeroSearchBar />
        </div>

        <Image
          src={images.heroPerson}
          alt="Student learning online"
          width={578}
          height={541}
          priority
          className="absolute top-[512px] left-1/2 hidden h-[541px] w-[578px] -translate-x-1/2 object-cover fig-shadow md:block"
        />

        <FloatingCards />

        <div className="pointer-events-none absolute inset-x-0 top-[640px] hidden justify-center gap-6 px-6 max-[1099px]:flex">
          <StatCard />
        </div>
      </div>
    </section>
  );
}

function FloatingCards() {
  return (
    <div className="hidden min-[1100px]:block">
      <div
        className="absolute flex flex-col gap-2 rounded-[16px] bg-white p-4 backdrop-blur-[20px]"
        style={{ left: 404, top: 639, width: 208 }}
      >
        <span className="text-[16px] leading-[19px] font-medium text-neutral-950">UI/UX Design</span>
        <div className="flex items-center gap-2 text-[12px] leading-[19px] text-neutral-400">
          <span>200 Courses</span>
          <span className="text-[10px]">•</span>
          <span>1000+ Students</span>
        </div>
      </div>

      <div
        className="absolute flex flex-col gap-2 rounded-[16px] bg-white p-4 backdrop-blur-[20px]"
        style={{ left: 842, top: 651, width: 232 }}
      >
        <span className="text-[14px] leading-[17px] font-medium text-neutral-950">Learning Progress</span>
        <span className="font-heading text-[48px] leading-[58px] font-semibold tracking-[-0.01em] text-neutral-950">
          55%
        </span>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#f6f6f6]">
          <div className="h-full w-[56%] rounded-full bg-secondary-400" />
        </div>
      </div>

      <div
        className="absolute flex flex-col gap-2 rounded-[16px] bg-white p-4 backdrop-blur-[20px]"
        style={{ left: 328, top: 837, width: 258 }}
      >
        <div className="flex flex-col">
          <span className="text-[16px] leading-[19px] font-medium text-neutral-950">Happy Students</span>
          <div className="flex items-center gap-2">
            <span className="text-[12px] leading-[19px] text-neutral-400">4.5 (240)</span>
            <StarIcon className="size-4 text-secondary-400" />
          </div>
        </div>
        <AvatarRow />
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="flex flex-col gap-2 rounded-[16px] bg-white p-4">
      <span className="text-[14px] leading-[17px] font-medium text-neutral-950">Learning Progress</span>
      <span className="font-heading text-[40px] leading-[48px] font-semibold text-neutral-950">55%</span>
      <div className="h-2 w-[200px] overflow-hidden rounded-full bg-[#f6f6f6]">
        <div className="h-full w-[56%] rounded-full bg-secondary-400" />
      </div>
    </div>
  );
}

function AvatarRow({ count = 7, overflow = "2K+" }: { count?: number; overflow?: string }) {
  return (
    <div className="flex items-center">
      {avatars.stack43.slice(0, count).map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          width={43}
          height={43}
          className="size-[43px] rounded-full object-cover"
          style={{ marginLeft: i === 0 ? 0 : -16 }}
        />
      ))}
      <span
        className="grid size-[43px] place-items-center rounded-full bg-secondary-400 text-[12px] leading-[18px] font-bold text-neutral-950"
        style={{ marginLeft: -16 }}
      >
        {overflow}
      </span>
    </div>
  );
}

function Partners() {
  return (
    <section className="w-full bg-neutral-50">
      <Container className="flex min-h-[202px] items-center justify-center py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-[72px] gap-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Logoipsum key={i} variant={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CourseShowcase() {
  return (
    <section className="w-full bg-white">
      <Container className="flex flex-col items-center pt-[72px]">
        <SectionHeading
          title="Discover Your Passion, Build Your Skills"
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        />

        <div className="mt-[42px] flex w-full flex-col items-center gap-[21px]">
          {tabRows.map((row, i) => (
            <div key={i} className="flex flex-wrap justify-center gap-4">
              {row.map((label, j) => (
                <button
                  key={label}
                  type="button"
                  className={`rounded-[24px] px-4 py-3 text-[16px] leading-[19px] font-medium transition-colors ${
                    i === 0 && j === 0
                      ? "bg-secondary-400 text-neutral-950"
                      : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-[77px] grid w-full grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 xl:grid-cols-3 lg:pr-px">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="w-full bg-white">
      <Container className="flex flex-col items-center pt-[72px] pb-[120px]">
        <SectionHeading
          title="Explore Diverse Learning Paths at Bytespace"
          description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
          className="[&>h2]:max-w-[820px] [&>h2]:text-[36px] [&>h2]:leading-[43px]"
        />

        <div className="mt-[68px] grid w-full grid-cols-2 justify-items-center gap-10 md:grid-cols-3 xl:grid-cols-6 min-[1440px]:-ml-px min-[1440px]:w-[1202px]">
          {categoryLabels.map((label, i) => (
            <Link
              key={label}
              href="/search"
              className="flex h-[167px] w-[167px] flex-col items-center justify-center gap-3 rounded-[24px] border border-hairline bg-neutral-50 transition-colors hover:border-primary-600"
            >
              <span className="grid size-[60px] place-items-center rounded-full bg-secondary-400 text-neutral-950">
                <CategoryIcon name={categories[i]} className="size-9" />
              </span>
              <span className="text-center text-[20px] leading-[24px] font-medium text-neutral-950">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function GrowthSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#fafafa]">
      <GlowBlob color="lime" radial strength={0.4} className="-top-[466px] -left-[152px] size-[1137px]" />
      <GlowBlob color="blue" radial strength={0.16} className="top-[183px] -left-[508px] size-[1137px]" />
      <GlowBlob color="blue" radial strength={0.08} className="-top-[458px] left-[811px] size-[1137px]" />
      <GlowBlob color="blue" radial strength={0.24} className="top-[788px] left-[722px] size-[1137px]" />
      <GlowBlob color="lime" radial strength={0.6} className="top-[946px] -left-[287px] size-[672px]" />

      <Container className="relative flex flex-col gap-[72px] py-[120px] lg:pl-[121px] lg:pr-[61px]">
        <div className="flex flex-col items-center gap-[63px] min-[1440px]:flex-row">
          <div className="flex w-full flex-col gap-10 min-[1440px]:w-[574px] min-[1440px]:shrink-0">
            <h2 className="font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-neutral-950 md:text-[44px] md:leading-[53px]">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="max-w-[477px] text-[18px] leading-[29px] text-neutral-700">
              Explore our curated selection of courses tailored to enhance your capabilities and
              accelerate your career journey. Whether you are looking to sharpen specific skills,
              gain industry expertise, or embark on a new career path entirely, we have the
              resources you need.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-14">
              {[
                ["12K", "Students"],
                ["70+", "Courses"],
                ["16", "Creators"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="font-heading text-[36px] leading-[44px] font-medium tracking-[-0.01em] text-primary-800">
                    {value}
                  </span>
                  <span className="text-[18px] leading-[29px] text-neutral-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[552px] w-full max-w-[621px] max-md:flex max-md:h-auto max-md:flex-col max-md:items-center max-md:gap-5 min-[1440px]:w-[621px] min-[1440px]:shrink-0">
            <CourseCard course={courses[0]} variant="loose" className="absolute left-0 top-0 z-0 max-md:static" />
            <Image
              src={images.heroPerson}
              alt="Student celebrating progress"
              width={577}
              height={540}
              className="absolute left-0 top-3 z-10 h-[540px] w-[577px] object-cover fig-shadow max-md:static max-md:order-first max-md:h-auto max-md:w-full max-md:rounded-[16px]"
            />
            <div className="absolute top-[213px] right-[44px] z-20 flex w-[232px] flex-col gap-2 rounded-[16px] bg-white p-4 max-md:static">
              <span className="text-[14px] leading-[24px] font-medium text-neutral-950">Learning Progress</span>
              <span className="font-heading text-[48px] leading-[58px] font-semibold text-neutral-950">55%</span>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#f6f6f6]">
                <div className="h-full w-[56%] rounded-full bg-secondary-400" />
              </div>
            </div>
            <Ornament
              src="/images/cda676fe_332x332.png"
              color="lime"
              className="right-0 top-[67px] z-30 size-[215px]"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-[79px] min-[1440px]:w-[1200px] min-[1440px]:flex-row-reverse">
          <div className="flex w-full flex-col gap-10 min-[1440px]:w-[580px] min-[1440px]:shrink-0 min-[1440px]:self-center">
            <h2 className="max-w-[391px] font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-neutral-950 md:text-[44px] md:leading-[53px]">
              Create{" "}
              <span style={{ letterSpacing: "-0.0909em" }}>&amp;</span> Manage Courses Easily.
            </h2>
            <p className="max-w-[574px] text-[18px] leading-[29px] text-neutral-700">
              ByteSpace supports individuals or entities in the creation, publication, and
              administration of educational courses.
            </p>
            <ul className="flex flex-col gap-4">
              {["Share Your Expertise", "Monetize Your Passion", "Flexibility and Autonomy", "Build a Community"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-600 text-white">
                      <CheckIcon className="size-4" />
                    </span>
                    <span className="text-[18px] leading-[22px] font-medium text-neutral-950">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="relative mx-auto h-[596px] w-full max-w-[541px] max-md:flex max-md:h-auto max-md:flex-col max-md:items-center max-md:gap-5 min-[1440px]:w-[541px] min-[1440px]:shrink-0">
            <BlueStat
              className="absolute left-0 top-11 w-[232px] max-md:static"
              label="Total Revenue"
              sub="July 1-28"
              value="$120.29"
              delta="+12$"
              progress
            />
            <BlueStat
              className="absolute left-0 top-[194px] w-[134px] max-md:static"
              label="Year to Date"
              sub="2023"
              value="$1,200.38"
              delta="+12$"
              stacked
            />
            <div className="absolute left-7 top-0 z-10 h-[596px] w-[435px] overflow-hidden fig-shadow max-md:static max-md:order-first max-md:h-auto max-md:w-full max-md:rounded-[16px]">
              <Image
                src={images.featureStack}
                alt="Creator managing courses"
                width={683}
                height={683}
                className="absolute top-0 -left-[124px] h-[683px] w-[683px] max-w-none max-md:static max-md:h-auto max-md:w-full"
              />
            </div>
            <div className="absolute top-[413px] left-[283px] z-20 flex w-[258px] flex-col gap-2 rounded-[16px] bg-white p-4 max-md:static">
              <div className="flex flex-col">
                <span className="text-[16px] leading-[24px] font-medium text-neutral-950">Happy Students</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] leading-[15px] text-neutral-400">4.5 (240)</span>
                  <StarIcon className="size-4 text-secondary-400" />
                </div>
              </div>
              <AvatarRow />
            </div>
            <Ornament
              src="/images/e3b55902_387x387.png"
              color="lime"
              className="left-[305px] top-[114px] z-30 size-[215px] max-md:hidden"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function BlueStat({
  className,
  label,
  sub,
  value,
  delta,
  progress,
  stacked,
}: {
  className?: string;
  label: string;
  sub: string;
  value: string;
  delta: string;
  progress?: boolean;
  stacked?: boolean;
}) {
  const badge = (
    <span className="rounded-[24px] bg-secondary-500 px-2 py-0.5 text-[10px] leading-5 font-medium text-neutral-950">
      {delta}
    </span>
  );
  return (
    <div className={`flex flex-col gap-2 rounded-[16px] bg-primary-800 p-4 ${className}`}>
      <div className="flex flex-col">
        <span className="text-[16px] leading-[19px] font-medium text-neutral-50">{label}</span>
        <span className="text-[10px] leading-[12px] text-neutral-50">{sub}</span>
      </div>
      {stacked ? (
        <>
          <span className="font-heading text-[24px] leading-[32px] font-semibold text-neutral-50">{value}</span>
          {badge}
        </>
      ) : (
        <div className="flex w-full items-center justify-between gap-2">
          <span className="font-heading text-[24px] leading-[32px] font-semibold text-neutral-50">{value}</span>
          {badge}
        </div>
      )}
      {progress ? (
        <div className="h-2 w-full overflow-hidden rounded-full bg-white">
          <div className="h-full w-[56%] rounded-full bg-secondary-400" />
        </div>
      ) : null}
    </div>
  );
}

function CreatorCta() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-primary-800">
      <GridBackdrop />
      <div className="hidden lg:block">
        <Ornament src="/images/e3b55902_387x387.png" color="lime" style={{ left: -122, top: -162, width: 387, height: 387 }} />
        <Ornament src="/images/8670b841_344x344.png" color="lime" style={{ left: 16, top: 298, width: 344, height: 344 }} />
        <Ornament src="/images/92fc70a3_372x372.png" style={{ left: 1222, top: 5, width: 372, height: 372 }} />
        <Ornament src="/images/f9c0e0fd_189x189.png" color="lime" style={{ left: 1078, top: 0, width: 189, height: 189 }} />
        <Ornament src="/images/cda676fe_332x332.png" color="lime" style={{ left: 1107, top: 289, width: 332, height: 332 }} />
        <Ornament src="/images/e3b55902_387x387.png" style={{ left: 179, top: 5, width: 176, height: 176 }} />
        <Ornament src="/images/5b3686bc_189x189.png" style={{ left: -50, top: 225, width: 189, height: 189 }} />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-6 pt-[85px] pb-[84px] text-center">
        <div className="flex max-w-[964px] flex-col items-center gap-10">
          <h2 className="max-w-[710px] font-heading text-[32px] leading-[38px] font-semibold tracking-[-0.01em] text-neutral-50 md:text-[44px] md:leading-[53px]">
            Unlock Your Potential as a Creator with ByteSpace
          </h2>
          <p className="text-[16px] leading-[26px] text-neutral-50 lg:text-[18px] lg:leading-[29px]">
            Experience the collaboration of numerous creators and an expanding selection of courses.
            Register now and become a part of a community comprising over 10,000 local and
            international creators. Utilize our Course Editor, and showcase your expertise by
            publishing your finest course on the ByteSpace Course Library.
          </p>
          <Link
            href="/register"
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
          >
            Join as Creator
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#fafafa]">
      <GlowBlob color="lime" radial strength={0.4} className="top-[-241px] left-[842px] size-[1137px]" />
      <GlowBlob color="lime" radial strength={0.6} className="top-[-138px] left-[395px] size-[672px]" />
      <GlowBlob color="blue" radial strength={0.24} className="top-[149px] -left-[442px] size-[1137px]" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-[72px] px-[40px] pt-[74px] pb-[57px] lg:px-[118px]">
        <div className="flex flex-col items-start gap-[43px] lg:flex-row lg:items-end">
          <h2 className="max-w-[577px] flex-1 font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-black md:text-[44px] md:leading-[53px]">
            Discover What Our Community Is Saying
          </h2>
          <p className="max-w-[580px] text-[18px] leading-[29px] text-[#4f4f4f]">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we
            do. Hear directly from those who have experienced the transformative journey of learning
            and creating on our platform. Explore testimonials that reflect the diverse perspectives
            of enthusiastic learners and accomplished creators.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-[41px] md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={t.name} className="flex flex-col gap-6 rounded-[24px] bg-white p-6">
              <Image src={t.avatar} alt={t.name} width={80} height={80} className="size-20 rounded-full object-cover" />
              <figcaption className="flex flex-col">
                <span
                  className={`font-heading text-[20px] font-semibold tracking-[-0.01em] text-black ${i === 0 ? "leading-6" : "leading-[28px]"}`}
                >
                  {t.name}
                </span>
                <span className="text-[18px] leading-[29px] text-primary-800">{t.role}</span>
              </figcaption>
              <blockquote className="text-[18px] leading-[29px] text-[#4f4f4f]">{t.quote}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
