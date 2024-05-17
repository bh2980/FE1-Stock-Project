import type { ScaleBand, ScaleLinear } from "d3";
import type { PropsWithChildren } from "react";

import type { PolymorphicPropsType, PolymorphicPropsWithInnerRefType } from "@customTypes/polymorphicType";

type BarChartDataType = { label: number; value: number | null };

export type BarChartProps = {
  width: number;
  height: number;
  data: BarChartDataType[];
  padding?: number;
};

export type BandAxisProps = PolymorphicPropsWithInnerRefType<"g"> & {
  xScale: ScaleBand<string>;
  outerTickLength?: number;
  innerTickLength?: number;
};

export type BarProps = PolymorphicPropsType<"g"> &
  PropsWithChildren & {
    xScale: ScaleBand<string>;
    yScale: ScaleLinear<number, number, never>;
    data: BarChartDataType;
    nullBarHeight?: number;
    animationDuration?: string;
    labelPostfix?: string;
  };
