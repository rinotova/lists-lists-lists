import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { emojies } from "../emojis";
import plural from "pluralize";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function emojiToUnicode(emoji: string) {
  let comp;
  if (emoji.length === 1) {
    comp = emoji.charCodeAt(0);
  }
  comp =
    (emoji.charCodeAt(0) - 0xd800) * 0x400 +
    (emoji.charCodeAt(1) - 0xdc00) +
    0x10000;
  if (comp < 0) {
    comp = emoji.charCodeAt(0);
  }
  return comp.toString(16);
}

const singularize = (word: string) => {
  return plural.singular(word);
};

export const getSuggestedEmoji = (phrase: string, isListContext: boolean) => {
  const emojiKeywordArray = phrase.toLowerCase().trim().split(" ");
  const emojiKeyword =
    emojiKeywordArray[isListContext ? 0 : emojiKeywordArray.length - 1];

  if (emojiKeyword) {
    const singularKeyword = singularize(emojiKeyword);
    for (const emoji of emojies) {
      const keywordsArray = emoji.keywords.toLowerCase().trim().split(" ");
      if (keywordsArray.includes(singularKeyword || emojiKeyword)) {
        return Number(`0x${emojiToUnicode(emoji.symbol)}`);
      }
    }
  }
};
