import BossBarAction from "../lib/util/BossBarAction"

export type BossBarData = {
    entityUUID: string;
    action: BossBarAction;
};

export type BossBarAddData = BossBarData & {
    action: BossBarAction.Add;
    health: number;
    color: number;
    dividers: number;
    flags: number;
    // title: string;
    title: any;
};

export type BossBarRemoveData = BossBarData & {
    action: BossBarAction.Remove;
};

export type BossBarUpdateHealthData = BossBarData & {
    action: BossBarAction.UpdateHealth;
    health: number;
};

export type BossBarUpdateTitleData = BossBarData & {
    action: BossBarAction.UpdateTitle;
    // title: string;
    title: any;
};

export type BossBarUpdateStyleData = BossBarData & {
    action: BossBarAction.UpdateStyle;
    color: number;
    dividers: number;
};

export type BossBarUpdateFlagsData = BossBarData & {
    action: BossBarAction.UpdateFlags;
    flags: number;
};

export type BossBarData =
    | BossBarAddData
    | BossBarRemoveData
    | BossBarUpdateHealthData
    | BossBarUpdateTitleData
    | BossBarUpdateStyleData
    | BossBarUpdateFlagsData;