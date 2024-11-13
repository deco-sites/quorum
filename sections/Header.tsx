import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Nav {
  logo?: {
    src?: ImageWidget;
    alt?: string;
  };
  navigation?: {
    links: {
      label?: string;
      url?: string;
    }[];
  };
}

export default function Header({
  logo = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
    alt: "Logo",
  },
  navigation = {
    links: [
      { label: "Home", url: "/" },
      { label: "About us", url: "/" },
      { label: "Princing", url: "/" },
      { label: "Contact", url: "/" },
    ],
  },
}: Nav) {
  return (
    <nav class="drawer drawer-end">
      <input id="mobile-drawer-nav" type="checkbox" class="drawer-toggle" />

      {/* main content */}
      <div class="drawer-content container xl:px-0 px-4 flex gap-8 items-center justify-between pt-10 w-full">
        <a href="/">
          <Image
            src={logo.src || ""}
            width={198}
            height={47}
            alt={logo.alt}
            class="w-32 lg:w-48"
          />
        </a>

        <div class="hidden items-center justify-between lg:flex">
          <ul class="flex">
            {navigation.links.map((link) => (
              <li class="group">
                <a
                  href={link.url}
                  aria-label={link.label}
                  class="link no-underline hover:underline p-4 text-secondary group-first:font-bold text-lg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <label
          htmlFor="mobile-drawer-nav"
          class="flex lg:hidden btn btn-ghost drawer-button text-secondary"
        >
          <Icon id="Bars3" size={24} strokeWidth={0.4} />
        </label>
      </div>

      {/* sidebar */}
      <aside class="drawer-side z-50">
        {/* Close when clicking on overlay */}
        <label
          htmlFor="mobile-drawer-nav"
          aria-label="close sidebar"
          class="drawer-overlay"
        />

        <div class="flex flex-col gap-8 min-h-full w-80 max-w-[80vw] bg-neutral text-base-content">
          <a class="p-4" href="/">
            <Image src={logo.src || ""} width={98} height={23} alt={logo.alt} />
          </a>

          <ul class="menu">
            {navigation?.links.map((link) => (
              <li class="group">
                <a
                  href={link.url}
                  aria-label={link.label}
                  class="link no-underline hover:underline p-4 text-secondary group-first:font-bold text-lg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </nav>
  );
}
