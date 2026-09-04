import React from "react";
import moment from "moment";
import Text from "@/src/common/components/Text";
import { HeaderItem } from "@/src/features/promo-entries/data-table/data-row/types";
import { DrawTableColumn } from "@/src/features/draw-result/results-table/types";

// ─── Promo Entries ────────────────────────────────────────────────────────────
export const PROMO_ENTRIES_TABLE_HEADERS: HeaderItem[] = [
  { id: "raffle.code",        label: "table-1", sortable: false, cellStyle: { flex: 1,   alignItems: "center" } },
  { id: "raffle.description", label: "table-2", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
  { id: "numTickets",         label: "table-3", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
  { id: "spendAmount",        label: "table-4", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
  {
    id: "redeemedAt",
    label: "table-5",
    sortable: false,
    cellStyle: { flex: 0.6, alignItems: "center" },
    renderCell: (value) => (
      <Text style={{ fontSize: 14, lineHeight: 18, color: "#D6D6D6" }}>
        {value ? moment(value as string).format("DD-MM-YYYY") : "—"}
      </Text>
    ),
  },
  { id: "raffle.status",      label: "table-6", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
];

// ─── User Page (Redemptions) ──────────────────────────────────────────────────
export const USER_REDEMPTIONS_TABLE_HEADERS: HeaderItem[] = [
  { id: "name",            label: "table-1", sortable: false, cellStyle: { flex: 1,   alignItems: "center" } },
  { id: "description",    label: "table-2", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
  { id: "numberOfEntries",label: "table-3", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
  { id: "amount",          label: "table-4", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
  {
    id: "date",
    label: "table-5",
    sortable: false,
    cellStyle: { flex: 0.6, alignItems: "center" },
    renderCell: (value) => (
      <Text style={{ fontSize: 14, lineHeight: 18, color: "#D6D6D6" }}>
        {value ? moment(value as string).format("DD-MM-YYYY") : "—"}
      </Text>
    ),
  },
  { id: "result",          label: "table-6", sortable: false, cellStyle: { flex: 0.6, alignItems: "center" } },
];

// ─── Draw Result ──────────────────────────────────────────────────────────────
export const DRAW_RESULT_PLACES: Record<number, string> = {
  1: "1ST PLACE",
  2: "2ND PLACE",
  3: "3RD PLACE",
  4: "4TH PLACE",
  5: "5TH PLACE",
};

export const DRAW_RESULT_COLUMNS: DrawTableColumn[] = [
  { id: "code",  label: "draw-no",   flex: 1 },
  {
    id: "drawAt",
    label: "draw-date",
    flex: 1,
    renderCell: (value) => (
      <Text fontFamily="Montserrat" style={{ fontSize: 13, lineHeight: 18, color: "#D6D6D6" }}>
        {value ? moment(value as string).format("DD-MM-YYYY") : "—"}
      </Text>
    ),
  },
  { id: "promotion",            label: "promotion", flex: 1 },
  { id: "totalRedeemedTickets", label: "entries",   flex: 1, align: "center" },
  {
    id: "place",
    label: "place",
    flex: 1,
    renderCell: (value) => (
      <Text>
        {DRAW_RESULT_PLACES[value as number] ?? "—"}
      </Text>
    ),
  },
  { id: "user.id", label: "user-id", flex: 1, align: "center" },
];
