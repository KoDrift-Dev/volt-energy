// VOLT artwork bundled as data URLs (GitHub file API can't push binary).
// hero-bg is split in two chunks: the CLI arg limit (~128KB) won't take it whole.
import HERO_BG_A from "./photos/hero-bg-a";
import HERO_BG_B from "./photos/hero-bg-b";
import WAVE from "./photos/wave";
import CAN from "./photos/can";
export const VOLT_HERO_BG = ("data:image/jpeg;base64," + HERO_BG_A + HERO_BG_B) as string;
export const VOLT_WAVE = WAVE;
export const VOLT_CAN = CAN;
