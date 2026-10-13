import type { ComponentType } from "react";
import type { DoodleName } from "@/content/site";
import { Chart } from "./Chart";
import { ChefHat } from "./ChefHat";
import { PosScreen } from "./PosScreen";
import { QrCode } from "./QrCode";
import { Receipt } from "./Receipt";
import { Scooter } from "./Scooter";
import type { IconProps } from "./types";

/** Maps the icon names used in content/site.ts to doodle components. */
export const doodles: Record<DoodleName, ComponentType<IconProps>> = {
  receipt: Receipt,
  pos: PosScreen,
  scooter: Scooter,
  chefhat: ChefHat,
  qr: QrCode,
  chart: Chart,
};
