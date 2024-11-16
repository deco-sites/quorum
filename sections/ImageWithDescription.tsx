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
  /** @title ID da Seção */
  sectionId?: string;
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function ImageWithDescription({
  title = "Click here to tweak this text however you want.",
  description = "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  image,
  placement = "right",
  cta = { id: "change-me-1", href: "/", text: "Change me" },
  sectionId,
}: Props) {
  return (
    <div id={sectionId} class="default-container">
      <div class="flex flex-col items-center gap-8">
        <div
          class={`flex w-full xl:container xl:mx-auto mx-5 md:mx-10 z-10 ${
            image
              ? PLACEMENT[placement]
              : "flex-col items-center justify-center text-center"
          } gap-10 lg:gap-14 justify-between items-center`}
        >
          <div
            class={`w-full ${
              image
                ? "flex flex-col"
                : "flex flex-col items-center justify-center"
            }`}
          >
            <h1 class="text-xl lg:text-2xl font-semibold text-primary pb-4">
              {title}
            </h1>
            <p class="leading-[150%] text-base-200 text-sm lg:text-lg pb-5 lg:pb-12">
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
            <div class="w-full lg:max-w-[485px] flex justify-center lg:justify-end">
              <Image
                width={485}
                class="w-full object-fit max-w-[485px]"
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
