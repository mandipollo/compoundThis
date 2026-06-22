import { Holding } from "./Holding.type";
import { Ratios } from "./Ratios.type";
import { TickerSnapshot } from "./TickerSnapshot.type";
import { YearOHLC } from "./YearOHLC.type";

export interface Summary {
	ratios: Ratios;
	holding: Holding;
	yearOHLC: YearOHLC;
	snapshot: TickerSnapshot;
}
