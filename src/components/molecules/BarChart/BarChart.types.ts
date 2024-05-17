import type { ScaleBand, ScaleLinear } from "d3";
import type { PropsWithChildren } from "react";

import type { PolymorphicPropsType, PolymorphicPropsWithInnerRefType } from "@customTypes/polymorphicType";

type BarChartDataType = { label: number; value: number };

export type BarChartProps = {
  width: number;
  height: number;
  data: BarChartDataType[];
};

export type BandAxisProps = PolymorphicPropsWithInnerRefType<"g"> & {
  xScale: ScaleBand<string>;
  outerTickLength?: number;
  innerTickLength?: number;
};

export type BarProps = PolymorphicPropsType<"rect"> &
  PropsWithChildren & {
    xScale: ScaleBand<string>;
    yScale: ScaleLinear<number, number, never>;
    data: BarChartDataType;
    nullBarHeight?: number;
  };
