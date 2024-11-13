import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  /**
   * @title Link
   */
  href: string;
  /**
   * @title Texto
   */
  text: string;
}

export interface Props {
  /**
   * @title Chamada
   */
  headline: string;
  /**
   * @title Titulo
   */
  title?: string;
  /**
   * @title Descrição
   */
  description?: string;
  /**
   * @title Imagem
   */
  image?: ImageWidget;
  /**
   * @title Posição da imagem
   */
  placement?: "left" | "right";
  /**
   * @title Botão - (CTA)
   */
  cta?: CTA;
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats({
  headline = "Place here your headline",
  title = "Click here to tweak this text however you want.",
  description = "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  image,
  placement = "right",
  cta = { id: "change-me-1", href: "/", text: "Change me" },
}: Props) {
  return (
    <div class="default-container">
      <div class="flex flex-col items-center gap-8">
        <div
          class={`flex w-full xl:container xl:mx-auto mx-5 md:mx-10 z-10 ${
            image
              ? PLACEMENT[placement]
              : "flex-col items-center justify-center text-center"
          } gap-2 lg:gap-5 justify-between items-center`}
        >
          <div
            class={`w-full gap-4 ${
              image
                ? "lg:max-w-[50%] flex flex-col"
                : "flex flex-col items-center justify-center lg:max-w-[586px]"
            }`}
          >
            <p class="text-warning font-semibold pb-4">{headline}</p>
            <h1 class="text-[40px] lg:text-[64px] font-bold text-primary pb-5">
              {title}
            </h1>
            <p class="leading-[150%] text-base-200 text-sm lg:text-xl pb-6">
              {description}
            </p>
            <div class="flex items-center gap-3">
              {cta && (
                <a
                  key={cta?.id}
                  id={cta?.id}
                  href={cta?.href}
                  target={cta?.href.includes("http") ? "_blank" : "_self"}
                  class={`bg-accent text-base-300 rounded-full font-semibold text-xs lg:text-lg py-3 px-6 lg:py-5 lg:px-12`}
                >
                  {cta?.text}
                </a>
              )}
            </div>
          </div>
          {image && (
            <div class="w-full lg:max-w-[50%] flex justify-center lg:justify-end">
              <Image
                width={555}
                class="w-full object-fit max-w-[555px]"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={image}
                alt={image}
                decoding="async"
                loading="lazy"
                fit="contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
