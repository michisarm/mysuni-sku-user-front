import React, { useCallback } from "react";
import { setCommunityProfileItem, getCommunityProfileItem } from "community/store/CommunityProfileStore";


interface ProfileEditViewProps {
  keyId: 'introduce'|'nickname'|'hobby';
  value: string;
}

const ProfileEditView: React.FC<ProfileEditViewProps> = function ProfileEditView({
  keyId,
  value,
}) {

  const handleChange = useCallback(
    (e: any) => {
    //
    const value = e.target.value;
    const profileItem = getCommunityProfileItem();
    if (profileItem === undefined) {
      return;
    }
    const nextProfileItem = { ...profileItem };
    nextProfileItem[keyId] = value;
    setCommunityProfileItem(nextProfileItem);
  },[keyId]);

  const clearProfileInput = useCallback(
    (e: any) => {
    //
    const value = '';
    const profileItem = getCommunityProfileItem();
    if (profileItem === undefined) {
      return;
    }
    const nextProfileItem = { ...profileItem };
    nextProfileItem[keyId] = value;
    setCommunityProfileItem(nextProfileItem);
  },[keyId]);

  return (
    <div className="ui input write profile">
      <input 
        type="text" 
        placeholder={
          (keyId==='introduce' && '소개를 입력해주세요.') || 
          (keyId==='nickname' && '닉네임을 입력해주세요.') || 
          (keyId==='hobby' && '취미를 입력해주세요.') || 
          ''} 
        value={value}
        onChange={handleChange}
      />
      <i aria-hidden="true" className="icon clear link" onClick={clearProfileInput}/>
    </div>
  );
}

export default ProfileEditView;
