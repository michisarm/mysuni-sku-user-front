import { getCommunityHomeCreateItem } from "community/store/CommunityHomeCreateStore";
import { NameValueList } from "shared/model";
import { registerHome, modifyHome } from "community/api/homeApi";
import { CommunityHomeCreateItem } from "community/viewModel/CommunityHomeCreate";

export async function saveCommunityHome(
    communityId: string,
    homeId?: string
): Promise<any> {
    const homeCreateItem = getCommunityHomeCreateItem();
    if (homeCreateItem !== undefined) {
        if (homeId === undefined) {
            return registerHome(communityId, homeCreateItem);
        } else if (homeId !== undefined) {
            return modifyHome(communityId, homeId, modifyNameValueList(homeCreateItem));
        }
    }
}
  

function modifyNameValueList(home: CommunityHomeCreateItem): NameValueList {
    const modifyNameValues = {
        // title, html, pinned, visible
      nameValues: [
        {
          name: 'type',
          value: String(home.type),
        },
        {
          name: 'introduce',
          value: home.introduce||'',
        },
        {
          name: 'thumbnailId',
          value: home.thumbnailId||'',
        },
        {
          name: 'html',
          value: home.html||''
        },
        {
          name: 'draft',
          value: String(home.draft)||''
        },        
      ],
    };
    return modifyNameValues;
}