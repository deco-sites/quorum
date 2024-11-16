export interface Props {
  copyright?: string;
  /** @title ID da Seção */
  sectionId?: string;
}

export default function Footer({
  copyright = "© 2024 deco.cx. All rights reserved.",
  sectionId,
}: Props) {
  return (
    <div
      id={sectionId}
      class="w-full flex justify-center py-4 px-7 bg-primary-content"
    >
      <span class="text-[10px] ">{copyright}</span>
    </div>
  );
}
