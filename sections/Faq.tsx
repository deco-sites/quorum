import { useScript } from "@deco/deco/hooks";
import Icon from "site/components/ui/Icon.tsx";

const onClick = (index: number) => {
  console.log(event);

  const input = document.getElementById(`plus-${index}`) as HTMLInputElement;

  if (input && input.checked) {
    input.checked = false;
  } else {
    input.checked = true;
  }
};

export interface Question {
  /** @title Pergunta */
  title: string;
  /**
   * @title Resposta
   * @format rich-text
   * */
  answer: string;
}

export interface Props {
  /** @title Titulo */
  title?: string;
  /** @title Chamada */
  headline?: string;
  /** @title Descrição */
  description?: string;
  /** @title Perguntas */
  questions?: Question[];
  /** @title ID da Seção */
  sectionId?: string;
}

export default function FAQ({
  title = "FAQs",
  headline = "Perguntas Frequentes",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  questions = [
    {
      title: "Question #1 text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut vestibulum ligula. Nam et tellus sit amet magna convallis interdum. Integer fermentum ligula nec velit hendrerit, quis feugiat odio feugiat. Ut vel nisi auctor, rhoncus felis vitae, tempor metus. Fusce ut lectus et ex consectetur ullamcorper. Nulla facilisi. Proin ullamcorper, odio a consectetur posuere, mauris felis rutrum lectus, et convallis est risus vitae nisi. Suspendisse potenti. Donec ultricies consectetur lorem, eget tempor nisi cursus in. Vivamus at nulla eros. Sed nec malesuada mauris. Curabitur id ex sed neque rutrum tincidunt. Sed sed lectus nec libero eleifend luctus. Aenean convallis feugiat elit, non tincidunt eros vehicula sed. Phasellus pretium urna sit amet risus interdum tempor.",
    },
    {
      title: "Question #2 text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut vestibulum ligula. Nam et tellus sit amet magna convallis interdum. Integer fermentum ligula nec velit hendrerit, quis feugiat odio feugiat. Ut vel nisi auctor, rhoncus felis vitae, tempor metus. Fusce ut lectus et ex consectetur ullamcorper. Nulla facilisi. Proin ullamcorper, odio a consectetur posuere, mauris felis rutrum lectus, et convallis est risus vitae nisi. Suspendisse potenti. Donec ultricies consectetur lorem, eget tempor nisi cursus in. Vivamus at nulla eros. Sed nec malesuada mauris. Curabitur id ex sed neque rutrum tincidunt. Sed sed lectus nec libero eleifend luctus. Aenean convallis feugiat elit, non tincidunt eros vehicula sed. Phasellus pretium urna sit amet risus interdum tempor.",
    },
    {
      title: "Question #3 text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut vestibulum ligula. Nam et tellus sit amet magna convallis interdum. Integer fermentum ligula nec velit hendrerit, quis feugiat odio feugiat. Ut vel nisi auctor, rhoncus felis vitae, tempor metus. Fusce ut lectus et ex consectetur ullamcorper. Nulla facilisi. Proin ullamcorper, odio a consectetur posuere, mauris felis rutrum lectus, et convallis est risus vitae nisi. Suspendisse potenti. Donec ultricies consectetur lorem, eget tempor nisi cursus in. Vivamus at nulla eros. Sed nec malesuada mauris. Curabitur id ex sed neque rutrum tincidunt. Sed sed lectus nec libero eleifend luctus. Aenean convallis feugiat elit, non tincidunt eros vehicula sed. Phasellus pretium urna sit amet risus interdum tempor.",
    },
    {
      title: "Question #4 text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut vestibulum ligula. Nam et tellus sit amet magna convallis interdum. Integer fermentum ligula nec velit hendrerit, quis feugiat odio feugiat. Ut vel nisi auctor, rhoncus felis vitae, tempor metus. Fusce ut lectus et ex consectetur ullamcorper. Nulla facilisi. Proin ullamcorper, odio a consectetur posuere, mauris felis rutrum lectus, et convallis est risus vitae nisi. Suspendisse potenti. Donec ultricies consectetur lorem, eget tempor nisi cursus in. Vivamus at nulla eros. Sed nec malesuada mauris. Curabitur id ex sed neque rutrum tincidunt. Sed sed lectus nec libero eleifend luctus. Aenean convallis feugiat elit, non tincidunt eros vehicula sed. Phasellus pretium urna sit amet risus interdum tempor.",
    },
    {
      title: "Question #5 text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut vestibulum ligula. Nam et tellus sit amet magna convallis interdum. Integer fermentum ligula nec velit hendrerit, quis feugiat odio feugiat. Ut vel nisi auctor, rhoncus felis vitae, tempor metus. Fusce ut lectus et ex consectetur ullamcorper. Nulla facilisi. Proin ullamcorper, odio a consectetur posuere, mauris felis rutrum lectus, et convallis est risus vitae nisi. Suspendisse potenti. Donec ultricies consectetur lorem, eget tempor nisi cursus in. Vivamus at nulla eros. Sed nec malesuada mauris. Curabitur id ex sed neque rutrum tincidunt. Sed sed lectus nec libero eleifend luctus. Aenean convallis feugiat elit, non tincidunt eros vehicula sed. Phasellus pretium urna sit amet risus interdum tempor.",
    },
  ],
  sectionId,
}: Props) {
  return (
    <div
      class="w-full flex items-center justify-center bg-primary"
      id={sectionId}
    >
      <div class="default-container">
        <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between lg:mx-[143px]">
          <div class="flex flex-col lg:w-2/5 text-secondary-content">
            <p class="lg:text-xs font-extralight pb-1">{title}</p>
            <p class="text-[28px] lg:text-[21px] font-semibold pb-4">
              {headline}
            </p>
            <p class="text-base-100 lg:text-xs font-extralight">
              {description}
            </p>
          </div>
          <div class="flex flex-col gap-2.5 flex-grow max-w-[418px]">
            {questions?.map((question, index) => (
              <div class="group bg-secondary text-secondary-content py-3 px-4 rounded-lg w-full transition-all duration-200">
                <div class="w-full" hx-on:click={useScript(onClick, index)}>
                  <input
                    type="radio"
                    name="faq"
                    class="peer hidden"
                    data-id="plus"
                    id={`plus-${index}`}
                  />
                  <div class="relative flex justify-between items-center w-full">
                    <span class="flex-auto text-xs">{question.title}</span>
                    <Icon
                      id="Plus"
                      class="absolute top-0 right-0 text-accent opacity-100"
                      width={16}
                      height={16}
                      strokeWidth={4}
                    />
                  </div>
                </div>
                <div
                  class="hidden group-has-[input[data-id=plus]:checked]:block text-xs px-4 pt-4 text-secondary-content"
                  dangerouslySetInnerHTML={{ __html: question.answer ?? "" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
