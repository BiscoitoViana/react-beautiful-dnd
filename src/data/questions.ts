import { type IQuestion } from "~/context/quiz/types"
const questions: IQuestion[] = [
  {
    id: "WOW_DRGNS001",
    type: "question",
    title: "Dragons everywhere!",
    data: {
      description:
        "<p>Which of these characters is <strong>NOT</strong> a dragon?</p>",
      options: [
        { label: "Ysera", value: "ysera" },
        { label: "Ner'zhul", value: "nerzhul" },
        { label: "Alexstrasza", value: "alexstrasza" },
        { label: "Nozdormu", value: "nozdormu" }
      ],
      validation: {
        valid_response: {
          value: ["nerzhul"]
        }
      }
    }
  },
  {
    id: "WCIII_UTHR-LCHKNG_101",
    title: "The death of the lightbringer",
    type: "question",
    data: {
      description:
        "<p class='mb-4'>During the events of Warcraft III the paladin known as <strong>Uther, the Lightbringer</strong> falls in battle. The next dialog contains Uther's last words with his killer. Who killed Uther?</p><p class='mb-2'><strong>Uther:</strong><em>I dearly hope that there's a special place in hell waiting for you, [the murderer].</em></p><p><strong>The murderer:</strong><em>We may never know, Uther. I intend to live forever.</em></p>",
      options: [
        { label: "High Priestess Tyrande Whisperwind", value: "tyrande" },
        { label: "Illidan, the Betrayer", value: "illidan" },
        { label: "Prince Arthas", value: "arthas" },
        { label: "Highlord Bolvar", value: "bolvar" }
      ],
      validation: {
        valid_response: {
          value: ["arthas"]
        }
      }
    }
  },
  {
    id: "WOW_DRGNS011",
    title: "The Destroyer",
    type: "question",
    data: {
      description:
        "<p>Before being known as <strong>Deathwing, the Destroyer</strong>, this colossal dragon was a proud defender of the world. What its original name and title?</p>",
      options: [
        { label: "Alexstrasza, the Life-Binder", value: "alestrasza" },
        { label: "Medivh, the Last Guardian", value: "medivh" },
        { label: "Nozdormu, the Timeless One", value: "nozdormu" },
        { label: "Neltharion, the Earth-Warder", value: "neltharion" }
      ],
      validation: {
        valid_response: {
          value: ["neltharion"]
        }
      }
    }
  }
]

export { questions }
