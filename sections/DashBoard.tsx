import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "site/components/ui/Slider.tsx";
import { useId } from "site/sdk/useId.ts";

interface Icon {
  /** @title Imagem */
  image: ImageWidget;
  /** @title Largura */
  width?: number;
  /** @title Altura */
  height?: number;
  alt?: string;
}

interface ImageItem {
  /** @title Imagem */
  image: ImageWidget;
  /** @title Etiqueta */
  label: string;
  /** @title Ícone da etiqueta */
  labelIcon: Icon;
  /** @title Ícone da etiqueta quando selecionada */
  selectedLabelIcon: Icon;
}

interface Props {
  /** @title Titulo */
  title: string;
  /**
   * @title Image Items
   * @description List of image items with labels
   */
  items?: ImageItem[];
  /**
   * @title Índice do item inicial
   * @description Deve-se informar a posição do item que deve iniciar marcado ao abrir a página, conte a partir do Zero
   * */
  initialActiveIndex?: number;
  /** @title ID da Seção */
  sectionId?: string;
}

function SliderItem({ slide, id }: { slide: ImageItem; id: string }) {
  return (
    <div id={id} class="w-full rounded-lg flex item justify-center">
      <div class="flex flex-col items-center gap-5">
        <label class="group">
          <button
            class={`flex items-center gap-[10px] px-4 py-[10px] rounded-full transition-all duration-300 bg-secondary text-base-100`}
          >
            <Image
              width={slide.selectedLabelIcon.width || 21}
              height={slide.selectedLabelIcon.height || 19}
              src={slide.selectedLabelIcon.image}
              alt={slide.selectedLabelIcon.alt}
              class="object-cover"
            />
            <p class="text-base">{slide.label}</p>
          </button>
        </label>
        <Image
          class="object-cover filter drop-shadow-cascade"
          src={slide.image}
          width={392}
          height={231}
        />
      </div>
    </div>
  );
}

function Dots({ items }: { items: ImageItem[] }) {
  return (
    <ul class="carousel col-span-full gap-3 z-40 -mt-16">
      {items?.map((_, index) => (
        <li class="carousel-item">
          <Slider.Dot index={index}>
            <div>
              <div class="w-2 h-2 rounded-full !bg-base-100 border-secondary group-disabled:!bg-secondary group-disabled:border-none dot" />
            </div>
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
}

export default function ImageCarousel({
  items = [],
  initialActiveIndex = 0,
  title,
  sectionId,
}: Props) {
  const totalItems = items.length;
  const oneThird = Math.floor(totalItems / 3);

  function moveElement(
    array: ImageItem[],
    fromIndex: number,
    toIndex: number = 0
  ) {
    const copy = [...array];

    if (
      fromIndex >= copy.length ||
      toIndex >= copy.length ||
      fromIndex < 0 ||
      toIndex < 0
    ) {
      throw new Error("Índices fora do intervalo do array");
    }

    const [element] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, element);

    return copy;
  }

  const sortedArray = moveElement(items, initialActiveIndex);

  const id = useId();

  return (
    <section id={sectionId}>
      {/* Desktop */}
      <div class="hidden lg:flex flex-col pt-[120px] -mb-[400px] pt-120px">
        <h2 class="text-[40px] font-extrabold text-center text-primary pb-20">
          {title}
        </h2>
        <section class="relative h-screen flex items-center justify-center pt-20">
          <div class="relative w-full h-full">
            {items.map((item, index) => (
              <div
                key={index}
                class="absolute transition-opacity duration-300 group top-0 left-0 right-0 mx-auto w-fit"
                id={`image-${index}`}
              >
                <input
                  data-dash-image-index={index}
                  type="radio"
                  name="dashboard-image"
                  class="hidden peer"
                  checked={index === initialActiveIndex}
                />
                <Image
                  width={606}
                  height={357}
                  src={item.image}
                  alt={item.label}
                  class="object-cover group-has-[input:checked]:opacity-100 opacity-0 filter drop-shadow-cascade"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div class="absolute w-full h-full flex items-center justify-center">
            {items.map((item, index) => {
              const angle = (index / (totalItems - 1)) * Math.PI - Math.PI;
              let radiusX = 550;
              let radiusY = 400;

              const isFirstOrLast = index === 0 || index === items.length - 1;

              if (isFirstOrLast) {
                radiusX = 400;
                radiusY = 350;
              } else if (index < oneThird) {
                radiusX = 450;
                radiusY = 350;
              } else if (index >= totalItems - oneThird) {
                radiusX = 450;
                radiusY = 350;
              }

              const x = Math.cos(angle) * radiusX;
              const y = Math.sin(angle) * radiusY;

              const offsetX = -100;
              const offsetY = -100;

              return (
                <label class="group">
                  <input
                    data-dash-label-index={index}
                    type="radio"
                    name="dashboard-label"
                    class="hidden peer"
                    checked={index === initialActiveIndex}
                  />
                  <button
                    key={index}
                    class={`absolute flex items-center gap-[10px] px-4 py-[10px] rounded-full transition-all duration-300 bg-accent-content text-secondary group-has-[input:checked]:bg-secondary group-has-[input:checked]:text-base-100`}
                    style={`transform: translate(${x + offsetX}px, ${
                      y + offsetY
                    }px);`}
                    hx-swap="none"
                    hx-trigger="mouseover"
                    hx-on={`mouseover: 
                    const imageInput = document.querySelector('input[data-dash-image-index="${index}"]');
                    if (imageInput) {
                      imageInput.checked = true;
                    }
                    const input = document.querySelector('input[data-dash-label-index="${index}"]');
                    if (input) {
                      input.checked = true;
                    }
                  `}
                  >
                    <Image
                      width={item.labelIcon.width || 21}
                      height={item.labelIcon.height || 19}
                      src={item.labelIcon.image}
                      alt={item.labelIcon.alt}
                      class="object-cover group-has-[input:checked]:hidden"
                      loading="lazy"
                    />
                    <Image
                      width={item.selectedLabelIcon.width || 21}
                      height={item.selectedLabelIcon.height || 19}
                      src={item.selectedLabelIcon.image}
                      alt={item.selectedLabelIcon.alt}
                      class="object-cover hidden group-has-[input:checked]:block"
                      loading="lazy"
                    />
                    <p class="text-base">{item.label}</p>
                  </button>
                </label>
              );
            })}
          </div>
        </section>
      </div>
      {/* Mobile */}
      <div
        id={id}
        class="flex lg:hidden flex-col pt-[120px] items-center gap-6 pb-16"
      >
        <h2 class="text-2xl font-extrabold text-center text-primary">
          {title}
        </h2>
        <Slider
          class="carousel carousel-center w-full col-span-full gap-[38px] z-30 items-start h-[380px]"
          rootId={id}
          infinite
        >
          {sortedArray?.map((slide, index) => (
            <Slider.Item index={index} class="carousel-item w-full ">
              <SliderItem slide={slide} id={`${id}::${index}`} />
            </Slider.Item>
          ))}
        </Slider>
        <Dots items={sortedArray} />
      </div>
    </section>
  );
}
