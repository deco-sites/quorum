import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Icon {
  image: ImageWidget;
  width?: number;
  height?: number;
  alt?: string;
}

interface ImageItem {
  image: ImageWidget;
  label: string;
  labelIcon: Icon;
  selectedLabelIcon: Icon;
}

interface Props {
  title: string;
  /**
   * @title Image Items
   * @description List of image items with labels
   */
  items?: ImageItem[];
  initialActiveIndex?: number;
}

export default function ImageCarousel({
  items = [],
  initialActiveIndex = 0,
  title,
}: Props) {
  const totalItems = items.length;
  const oneThird = Math.floor(totalItems / 3);

  return (
    <div class="flex flex-col pt-[120px] -mb-[20%]">
      <h2 class="text-[40px] font-extrabold text-center text-primary">
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
                class="object-cover group-has-[input:checked]:opacity-100 opacity-0 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div class="absolute w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            // Calcular o ângulo para os itens
            const angle = (index / (totalItems - 1)) * Math.PI - Math.PI;

            // Ajuste do raio: primeiro e último terço com raio menor
            let radiusX = 550;
            let radiusY = 400;

            // Aplicar o efeito de proximidade no primeiro terço

            const isFirstOrLast = index === 0 || index === items.length - 1;

            if (isFirstOrLast) {
              radiusX = 400;
              radiusY = 350;
            } else if (index < oneThird) {
              radiusX = 450;
              radiusY = 350;
            }

            // Aplicar o efeito de proximidade no último terço
            else if (index >= totalItems - oneThird) {
              radiusX = 450;
              radiusY = 350;
            }

            // Posições baseadas nos ângulos ajustados
            const x = Math.cos(angle) * radiusX;
            const y = Math.sin(angle) * radiusY;

            // Adicionando deslocamento
            const offsetX = -100; // Deslocamento para a esquerda
            const offsetY = -100; // Deslocamento para cima

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
                  class={`absolute flex items-center gap-[10px] px-4 py-[10px] rounded-full transition-all duration-300 bg-accent-content text-secondary group-has-[input:checked]:bg-secondary group-has-[input:checked]:text-base-100 hover:bg-blue-500 hover:text-white`}
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
  );
}
