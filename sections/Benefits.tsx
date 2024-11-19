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
  /** @title Descrição */
  description: string;
}

export interface Props {
  /** @title Titulo */
  title: string;
  /** @title Cards */
  cards: Card[];
  /** @title ID da Seção */
  sectionId?: string;
}

export default function Benefits({ cards, title, sectionId }: Props) {
  return (
    <div class="default-container !justify-center lg:!py-20" id={sectionId}>
      <div class="flex flex-col gap-10">
        <div class="flex flex-col items-center">
          <h3 class="text-2xl font-bold text-center lg:text-[32px] text-primary lg:leading-normal max-w-[308px] sm:max-w-[879px]">
            {title}
          </h3>
        </div>
        <div class="flex flex-col gap-6 lg:flex-row">
          {cards.map((card) => (
            <div class="bg-secondary rounded-3xl py-6 px-7 flex flex-col items-center lg:flex-1 gap-5">
              <div class="rounded-full w-[68px] h-[68px] bg-secondary flex items-center justify-center">
                <Image
                  src={card.icon}
                  width={card.width || 47}
                  height={card.height || 47}
                  alt={card.alt}
                  loading="lazy"
                  fetchPriority="low"
                />
              </div>
              <p class="text-center font-xs text-base-100 ">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
