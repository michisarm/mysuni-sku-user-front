import React from 'react';
import { Segment } from 'semantic-ui-react';
import Profile from '../../../model/Profile';

interface OtherProfileViewProps {
  profile?: Profile;
}

const OtherProfileView: React.FC<OtherProfileViewProps> = function OtherProfileView({
  profile,
}) {
  return (
    <>
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <div className="community-main-contants">
            <table className="ui fixed table vertical celled">
              <tbody>
                <tr>
                  <th scope="row" className="three wide">
                    이름
                  </th>
                  <td>{profile?.name}</td>
                </tr>
                <tr>
                  <th scope="row">관계사</th>
                  <td>{profile?.company.name}</td>
                </tr>
                <tr>
                  <th scope="row">닉네임</th>
                  <td>{profile?.nickname}</td>
                </tr>
                <tr>
                  <th scope="row">취미</th>
                  <td>{profile?.hobby}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Segment>
    </>
  );
};

export default OtherProfileView;
