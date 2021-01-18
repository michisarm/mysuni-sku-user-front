import { existsByNickname } from "community/api/profileApi";

export async function getExistsByNickname(nickname: string): Promise<boolean> {
    return existsByNickname(nickname);
}
