import React, { useCallback } from "react";
import { setCommunityProfileItem, getCommunityProfileItem } from "community/store/CommunityProfileStore";


interface ContentsProfileEditViewProps {
  keyId: 'introduce'|'nickname'|'hobby';
  value: string;
}

const ContentsProfileEditView: React.FC<ContentsProfileEditViewProps> = function ContentsProfileEditView({
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
          (keyId==='introduce' && '소개를 입력해주세요(100자까지 입력 가능)') || 
          (keyId==='nickname' && '닉네임을 입력해주세요(20자까지 입력 가능)') || 
          (keyId==='hobby' && '취미를 입력해주세요(100자까지 입력 가능)') || 
          ''} 
        value={value}
        onChange={handleChange}
      />
      <i aria-hidden="true" className="icon clear link" onClick={clearProfileInput}/>
    </div>
  );
}

export default ContentsProfileEditView;
