import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SignalIcon, StarIcon } from "@/components/icons";
import { avatars, type Course } from "@/data/site";

type Variant = "tight" | "loose";

export function CourseCard({
  course,
  className,
  variant = "tight",
}: {
  course: Course;
  className?: string;
  variant?: Variant;
}) {
  const tight = variant === "tight";

  return (
    <article
      className={cn(
        "group flex w-full max-w-[373px] flex-col rounded-[24px] border border-hairline bg-white px-[15px] pt-[15px] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(4,8,25,0.35)]",
        tight ? "pb-[20px]" : "pb-[15px]",
        className,
      )}
    >
      <div className="relative aspect-[341/195] w-full overflow-hidden rounded-[12px] bg-[#443131]">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 341px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <ul className="sr-only">
          <li>{course.lessons}</li>
          <li>{course.duration}</li>
          <li>{course.comments}</li>
        </ul>
      </div>

      <div className="mt-[21px] flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex min-w-0 flex-col">
            <Link
              href="/course"
              className={cn(
                "block max-w-full truncate font-heading text-[18px] font-semibold tracking-[-0.01em] text-black hover:text-primary-600 sm:text-[20px]",
                tight ? "leading-[24px]" : "leading-[28px]",
              )}
            >
              {course.title}
            </Link>
            <span
              className={cn(
                "text-[12px] text-[#4f4f4f]",
                tight ? "leading-[19px]" : "leading-[20px]",
              )}
            >
              {course.author}
            </span>
          </div>

          <div className="flex shrink-0 items-center">
            <span
              className={cn(
                "text-[18px] text-[#4f4f4f]",
                tight ? "font-normal leading-[29px]" : "font-medium leading-[28px]",
              )}
            >
              {course.rating}
            </span>
            <StarIcon className="size-6 text-secondary-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-[24px] bg-neutral-50 px-3 py-1.5 text-[12px] font-medium text-neutral-700",
              tight ? "leading-[14px]" : "leading-5",
            )}
          >
            <SignalIcon className="size-5" />
            {course.level}
          </span>

          <div className="flex items-center">
            {avatars.stack32.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
                style={{ marginLeft: i === 0 ? 0 : -8 }}
              />
            ))}
            <span
              className={cn(
                "grid size-8 place-items-center rounded-full text-[12px] font-medium",
                tight ? "bg-secondary-400 leading-[14px] text-neutral-950" : "bg-black leading-5 text-white",
              )}
              style={{ marginLeft: -8 }}
            >
              {course.extraStudents}
            </span>
          </div>
        </div>

        <div className="flex items-baseline">
          <span
            className={cn(
              "font-heading text-[20px] leading-[24px] font-semibold",
              tight ? "text-primary-800" : "text-[#300b6a]",
            )}
          >
            {course.price}
          </span>
          <span
            className={cn(
              "text-[12px] text-[#4f4f4f]",
              tight ? "leading-[19px]" : "leading-[20px]",
            )}
          >
            {course.priceSuffix}
          </span>
        </div>
      </div>
    </article>
  );
}
