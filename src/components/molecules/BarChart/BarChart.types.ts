import type { ScaleBand, ScaleLinear } from "d3";
import type { PropsWithChildren } from "react";

import type { PolymorphicPropsType, PolymorphicPropsWithInnerRefType } from "@customTypes/polymorphicType";

type BarChartDataType = { label: number; value: number };
type BarChartDataWithNullType = { label: number; value: null };

export type BarChartProps = {
  width: number;
  height: number;
  data: (BarChartDataType | BarChartDataWithNullType)[];
  padding?: number;
  nullBarHeight?: number;
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
  };
