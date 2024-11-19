import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";

interface ItemProps {
  /** @title Etiqueta */
  label: string;
  /**
   * @title Cor da etiqueta
   * @format  color-input
   */
  labelColor: string;
  /**
   * @title Cor do texto etiqueta
   * @format  color-input
   */
  labelTextColor?: string;
  /** @title Titulo */
  title: string;
  /** @title Descrição */
  description: string;
  /** @title Imagem */
  image: ImageWidget;
}

export interface Props {
  items?: ItemProps[];
  /** @title ID da Seção */
  sectionId?: string;
}

export default function StickyImageSection({ items = [], sectionId }: Props) {
  const device = useDevice();

  if (device === "desktop")
    return (
      <section id={sectionId}>
        {/* Desktop */}
        <section class="default-container !hidden lg:!flex lg:pt-0">
          <div class="flex w-full">
            <div class="w-1/2 sticky top-0 h-screen">
              <div class="relative w-full h-full flex items-center justify-center">
                {items.map((item, index) => (
                  <Image
                    width={457}
                    height={635}
                    key={index}
                    src={item.image}
                    alt={item.label}
                    class={`absolute inset-0 transition-opacity duration-300 ${
                      index === 0 ? "opacity-1" : "opacity-0"
                    } top-0 left-0 bottom-0 my-auto`}
                    data-index={index}
                    loading="lazy"
                    fetchPriority="low"
                  />
                ))}
              </div>
            </div>
            <div class="w-1/2">
              {items.map((item, index) => (
                <div
                  key={index}
                  class="h-screen flex flex-col justify-center p-8 gap-2.5 max-w-[400px]"
                  data-image-index={index}
                  hx-trigger="intersect threshold:0.5"
                  hx-swap="none"
                  hx-on={`intersect: 
              document.querySelectorAll('img[data-index]').forEach(img => {
                img.style.opacity = img.dataset.index == '${index}' ? '1' : '0';
              });
            `}
                >
                  <h4
                    class="py-2.5 px-6 rounded-full w-min whitespace-nowrap"
                    style={{
                      backgroundColor: item.labelColor,
                      color: item.labelTextColor || "#FFFFFF",
                    }}
                  >
                    {item.label}
                  </h4>
                  <h2 class="text-[40px] font-bold text-primary-content">
                    {item.title}
                  </h2>
                  <p class="text-base-content">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    );
  else {
    return (
      <section id={sectionId}>
        <section class="default-container lg:hidden pt-16">
          <div class="flex w-full flex-col items-center">
            {items.map((item, index) => (
              <div key={index} class="flex flex-col justify-center p-8 gap-2">
                <h4
                  class="py-2.5 px-5 rounded-full w-min whitespace-nowrap text-base"
                  style={{
                    backgroundColor: item.labelColor,
                    color: item.labelTextColor || "#FFFFFF",
                  }}
                >
                  {item.label}
                </h4>
                <h2 class="text-2xl font-bold text-primary-content">
                  {item.title}
                </h2>
                <p class="text-base-content text-[15px]">{item.description}</p>
                <Image
                  width={380}
                  height={528}
                  key={index}
                  src={item.image}
                  alt={item.label}
                  data-index={index}
                  class="self-center pt-10"
                  loading="lazy"
                  fetchPriority="low"
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }
}
