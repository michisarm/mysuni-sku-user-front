import { getProfileItemMapFromCommunity } from "./getProfileItemMapFromCommunity";

export async function getCommunityProfile(): Promise<void> {
    getProfileItemMapFromCommunity();
}

