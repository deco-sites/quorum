import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";

interface Content {
  /** @title Avatar */
  avatar?: ImageWidget;
  alt?: string;
  /** @title Nome */
  name?: string;
  /** @title Posição */
  position?: string;
  /** @title Chamada */
  headline?: string;
  /** @title Descrição */
  description?: string;
}

/**
 * @titleBy alt
 */
export interface Testimonial {
  /** @title Conteúdo */
  content?: Content;
}

export interface Props {
  /** @title Titulo */
  title?: string;
  /** @title Slides */
  slides?: Testimonial[];
  /**
   * @title Mostrar Dots
   */
  dots?: boolean;
  /**
   * @title Intervalo do Carrousel
   * @description tempo (em segundos) para acontecer a passagem do item do slide
   */
  interval?: number;
  /** @title ID da Seção */
  sectionId?: string;
}

function SliderItem({ slide, id }: { slide: Testimonial; id: string }) {
  const { content } = slide;

  return (
    <div
      id={id}
      class="relative overflow-y-hidden w-full min-h-[292px] bg-base-100 rounded-lg p-6 flex"
    >
      <div class="flex flex-col justify-center items-center gap-3 lg:gap-4 h-full max-w-[600px]">
        <div class="flex items-center gap-3 font-manrope">
          <Image
            class="object-cover w-14 h-14 rounded-full"
            alt={content?.alt}
            src={content?.avatar || ""}
            width={47}
            height={47}
          />
          <div class="flex flex-col items-start">
            <p class="text-xs lg:text-base text-primary font-bold">
              {content?.name}
            </p>
            <p class="text-[10px] lg:text-base text-base-200">
              {content?.position}
            </p>
          </div>
        </div>
        <p class="text-base text-primary font-semibold lg:text-lg">
          {content?.headline}
        </p>
        <p class="text-xs text-base-200 lg:text-sm text-center">
          {content?.description}
        </p>
      </div>
    </div>
  );
}

function Dots({ slides }: Props) {
  return (
    <ul class="carousel col-span-full gap-3 z-10">
      {slides?.map((_, index) => (
        <li class="carousel-item">
          <Slider.Dot index={index}>
            <div>
              <div class="w-2 h-2 rounded-full !bg-secondary border border-base-100 group-disabled:!bg-base-100 group-disabled:border-none dot" />
            </div>
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
}

function Carousel(props: Props) {
  const id = useId();
  const { title, slides, interval, sectionId } = { ...props };

  return (
    <div id={sectionId}>
      <div
        id={id}
        class="default-container bg-secondary lg:rounded-[33px] relative lg:px-[90px] lg:py-[60px] lg:my-[120px] font-inter"
      >
        <div class="flex flex-col gap-8 lg:gap-10 default-container !py-0">
          <h2 class="text-3xl font-bold text-center lg:text-left lg:text-4xl text-base-100 self-start w-full">
            {title}
          </h2>
          <Slider
            class="carousel carousel-center w-full col-span-full row-span-full gap-[38px] z-30"
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          >
            {slides?.map((slide, index) => (
              <Slider.Item
                index={index}
                class="carousel-item lg:w-[calc(50%-19px)] max-w-[498px] w-full"
              >
                <SliderItem slide={slide} id={`${id}::${index}`} />
              </Slider.Item>
            ))}
          </Slider>

          <div class="flex justify-between">
            {props.dots && <Dots slides={slides} />}
          </div>
          <Icon
            id="Apostrophe"
            width={147}
            height={125}
            class="absolute top-10 right-10 hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
