import React, {
} from 'react';
import { useHistory } from 'react-router-dom';

interface AdminTitleViewProps {
  communityId: string;
}

const AdminTitleView: React.FC<AdminTitleViewProps> = function AdminTitleView({
  communityId,
}) {
  const history = useHistory();

  return (
    <>
      <div className="admin_community_top">
        <div className="admin_community">
          <h3>커뮤니티 관리</h3>
          <button onClick={e=>history.push(`/community/${communityId}`)}><img src={`${process.env.PUBLIC_URL}/images/all/icon-admin-home.png`} />Community Home</button>
        </div>
      </div>
    </>
  );
};

export default AdminTitleView;
