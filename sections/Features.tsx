import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Card {
  /** @title Ícone */
  icon: ImageWidget;
  /** @title Largura */
  width?: number;
  /** @title Altura */
  height?: number;
  alt?: string;
  /** @title Titulo */
  title: string;
  /** @title Descrição */
  description: string;
}

export interface Props {
  /** @title Etiqueta */
  label: string;
  /** @title Titulo */
  title: string;
  /** @title Cards */
  cards: Card[];
  /** @title ID da Seção */
  sectionId?: string;
}

export default function Features({ cards, label, title, sectionId }: Props) {
  return (
    <div class="default-container lg:!py-[120px]" id={sectionId}>
      <div class="flex flex-col gap-10">
        <div class="flex flex-col items-center">
          <span class="bg-secondary rounded-full py-2 px-[18px] text-xs lg:text-base text-base-100">
            {label}
          </span>
          <h3 class="text-2xl font-bold text-center lg:text-[40px] mt-[10px] text-primary-content lg:leading-normal max-w-[879px]">
            {title}
          </h3>
        </div>
        <div class="flex flex-col gap-6 lg:flex-row">
          {cards.map((card) => (
            <div class="bg-base-100 rounded-3xl py-6 px-7 flex flex-col items-center lg:flex-1 gap-3">
              <div class="rounded-full w-[68px] h-[68px] bg-secondary flex items-center justify-center">
                <Image
                  src={card.icon}
                  width={card.width || 37}
                  height={card.height || 37}
                  alt={card.alt}
                />
              </div>
              <p class="text-[20px] font-bold text-center text-primary-content">
                {card.title}
              </p>
              <p class="text-base-content text-center font-xs">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
