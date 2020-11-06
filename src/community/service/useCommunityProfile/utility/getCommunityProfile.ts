import { getProfileItemMapFromCommunity } from "./getProfileItemMapFromCommunity";
import { getMyCommunityItemMapFromCommunity } from "./getMyCommunityItemMapFromCommunity";

export async function getCommunityProfile(): Promise<void> { 
    getProfileItemMapFromCommunity(); 
}

export async function getCommunityProfileMyCommunity(): Promise<void> { 
    getMyCommunityItemMapFromCommunity(); 
}