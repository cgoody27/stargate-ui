export interface AstronautDetail {
    id: number;
    personId: number;
    currentRank: string;
    currentDutyTitle: string;
    careerStartDate: string; // ISO date string
    careerEndDate?: string | null;
}

export interface AstronautDuty {
    id: number;
    personId: number;
    rank: string;
    dutyTitle: string;
    dutyStartDate: string; // ISO date string
    dutyEndDate?: string | null;
}

export interface Person {
    id: number;
    name: string;
    astronautDetail?: AstronautDetail | null;
    astronautDuties: AstronautDuty[];
}

export interface BaseResponse {
    success: boolean;
    message: string;
    responseCode: number;
}