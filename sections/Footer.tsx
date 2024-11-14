export interface Props {
  copyright?: string;
}

export default function Footer({
  copyright = "© 2024 deco.cx. All rights reserved.",
}: Props) {
  return (
    <div class="w-full flex justify-center py-4 px-7 bg-primary-content">
      <span class="text-[10px] ">{copyright}</span>
    </div>
  );
}
