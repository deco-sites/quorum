import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";

function script() {
  const handleScroll = () => {
    const targetElement = document.getElementById("stickyElement");

    if (targetElement) {
      const lastScrollY = parseInt(
        targetElement.getAttribute("data-last-scroll") || "0",
        10
      );
      const currentScrollY =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (currentScrollY > 50)
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY) {
            // Rolando para baixo, aplica transform
            targetElement.style.transform = "translateY(-100%)";
          } else {
            // Rolando para cima, aplica transform
            targetElement.style.transform = "translateY(0)";
          }
        }
      // Atualiza o valor no atributo data-last-scroll
      targetElement.setAttribute("data-last-scroll", currentScrollY.toString());
    }
  };

  document.body.addEventListener("scroll", handleScroll);
}

export interface Link {
  /** @title Texto do Link */
  label?: string;
  /**
   * @title link
   * @description Para usar o 'Scroll to' passe o valor com um # seguido do ID da section (ex: #id-section)
   * */
  url?: string;
  openOnNewTab?: boolean;
}

export interface CTA {
  id?: string;
  href: string;
  text: string;
  openOnNewTab?: boolean;
}

interface Nav {
  /** @title Links */
  links: Link[];
  /** @title Botões */
  buttons: CTA[];
}

export interface Props {
  /** @title Logo */
  logo?: {
    src?: ImageWidget;
    alt?: string;
  };
  /** @title Navegação */
  navigation?: Nav;
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
    buttons: [],
  },
}: Props) {
  return (
    <>
      <nav class="drawer drawer-end h-24 lg:h-20">
        <input id="mobile-drawer-nav" type="checkbox" class="drawer-toggle" />

        {/* main content */}
        <div
          id="stickyElement"
          class="fixed top-0 bg-neutral z-50 w-full pb-4 transition-transform duration-200 ease-in-out"
          data-last-scroll="0"
        >
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
                      target={link.openOnNewTab ? "_blank" : "_self"}
                      class="link no-underline hover:underline p-4 text-secondary group-first:font-bold text-lg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul class="flex gap-3">
                {navigation.buttons?.map((item) => (
                  <a
                    key={item?.id}
                    id={item?.id}
                    href={item?.href}
                    target={item.openOnNewTab ? "_blank" : "_self"}
                    class={`bg-secondary text-base-300 rounded-full text-xs lg:text-lg py-1.5 px-3 lg:py-2 lg:px-6`}
                  >
                    {item?.text}
                  </a>
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
        </div>

        {/* sidebar */}
        <aside class="drawer-side z-50 overflow-x-hidden">
          {/* Close when clicking on overlay */}
          <label
            htmlFor="mobile-drawer-nav"
            aria-label="close sidebar"
            class="drawer-overlay"
          />

          <div class="flex flex-col gap-2 min-h-full w-80 max-w-[80vw] bg-neutral text-base-content">
            <a class="p-4" href="/">
              <Image
                src={logo.src || ""}
                width={98}
                height={23}
                alt={logo.alt}
              />
            </a>

            <ul class="menu">
              {navigation?.links.map((link) => (
                <li class="group">
                  <a
                    href={link.url}
                    target={link.openOnNewTab ? "_blank" : "_self"}
                    hx-on:click={`
                  const input = document.getElementById('mobile-drawer-nav')

                  if(input){
                    input.checked = false
                  }
                `}
                    aria-label={link.label}
                    class="link no-underline hover:underline p-4 text-secondary group-first:font-bold text-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul class="p-4 flex items-center gap-3">
              {navigation.buttons?.map((item) => (
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href}
                  target={item.openOnNewTab ? "_blank" : "_self"}
                  class={`bg-secondary text-base-300 rounded-full py-3 px-6`}
                >
                  {item?.text}
                </a>
              ))}
            </ul>
          </div>
        </aside>
      </nav>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(script),
        }}
      />
    </>
  );
}
