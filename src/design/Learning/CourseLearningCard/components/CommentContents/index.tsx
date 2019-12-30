import React, { Component, createRef } from 'react';
import {
  List,
  Form,
  Radio,
  Image, Icon, Button, Label, Comment,
} from 'semantic-ui-react';
import CubeEnrollment from '../CubeRequired';
import CommentStarRating from '../CommentStarRating';
import ReplyForm01 from '../ReplyForm01';
import ReplyForm02 from '../ReplyForm02';
import CommentsSort from '../CommentsSort';

interface Props {

}

interface States {
  value? : any
}

class CommentContents extends React.Component<Props, States> {

  handleChange(e:any, { value }:any) {
    // this.setState({value});
  }

  render() {
    return (
      <Comment.Content className="contents comment">

        {/* comment-star-rating */}
        <CommentStarRating />

        {/* reply */}
        <ReplyForm01 />

        {/* comments-sort */}
        <CommentsSort />

        {/* comments */}
        <Comment.Group className="base">
          {/*comment : 2줄이상 말줄임, 대댓글*/}
          <Comment>
            <Comment.Avatar src="/images/all/profile-56-px.png" />
            <Comment.Content>
              <Comment.Author as="a">김연아</Comment.Author>
              <Comment.Metadata>
                <span className="date">2019.10.23</span>
              </Comment.Metadata>
              <Comment.Text>
                <div className="ellipsis">
                  {/* .expend // */}
                  <span className="tag">@강하늘</span>
                  <span>이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요.</span>
                </div>
                <Button>+ View more</Button>
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="left postset edit2"><Icon className="edit2" />Edit</Button>
                  <Button icon className="left postset delete"><Icon className="delete" />Delete</Button>
                  <Button icon className="left postset reply2"><Icon className="reply2" />Reply</Button>
                </div>
                <Button className="cmt">View Replies</Button>
                <span className="count">3</span>
              </Comment.Actions>
            </Comment.Content>
            {/* collapsed 추가시 덧글(display:none 상태) */}
            <Comment.Group className="collapsed">
              <Comment>
                <Comment.Avatar src="/images/all/icon-noti-48-px.svg" />
                <Comment.Content>
                  <span className="empty">삭제된 댓글입니다.</span>
                </Comment.Content>
              </Comment>
              <Comment>
                <Comment.Avatar src="/images/all/icon-noti-48-px.svg" />
                <Comment.Content>
                  <span className="empty">삭제된 댓글입니다.</span>
                </Comment.Content>
              </Comment>
              <Comment>
                <Comment.Avatar src="/images/all/icon-noti-48-px.svg" />
                <Comment.Content>
                  <span className="empty">삭제된 댓글입니다.</span>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>
          {/* .comment : 2줄이상 노출, 대댓글 */}
          <Comment>
            <Comment.Avatar src="/images/all/profile-56-px.png" />
            <Comment.Content>
              <Comment.Author as="a">김연아</Comment.Author>
              <Comment.Metadata>
                <span className="date">2019.10.23</span>
              </Comment.Metadata>
              <Comment.Text>
                <div className="ellipsis">
                  {/* .expend // */}
                  <span>
                                        이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요.
                  </span>
                </div>
                <Button>+ View more</Button>
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="left postset edit2"><Icon className="edit2" />Edit</Button>
                  <Button icon className="left postset delete"><Icon className="delete" />Delete</Button>
                  <Button icon className="left postset reply2"><Icon className="reply2" />Reply</Button>
                </div>
                <Button className="cmt">View Replies</Button>
                <span className="count">3</span>
              </Comment.Actions>
            </Comment.Content>
            {/* collapsed 추가시 덧글(display:none 상태) */}
            <Comment.Group className="collapsed">
              <Comment>
                <Comment.Avatar src="/images/all/icon-noti-48-px.svg" />
                <Comment.Content>
                  <span className="empty">삭제된 댓글입니다.</span>
                </Comment.Content>
              </Comment>
              <Comment>
                <Comment.Avatar src="/images/all/icon-noti-48-px.svg" />
                <Comment.Content>
                  <span className="empty">삭제된 댓글입니다.</span>
                </Comment.Content>
              </Comment>
              <Comment>
                <Comment.Avatar src="/images/all/icon-noti-48-px.svg" />
                <Comment.Content>
                  <span className="empty">삭제된 댓글입니다.</span>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>
          {/* comment : 삭제된 댓글 */}
          <Comment>
            <span className="avatar"><Icon className="avatar56" /><span className="blind">avatar</span></span>
            <Comment.Content>
              <span className="empty h56">삭제된 댓글입니다.</span>
            </Comment.Content>
          </Comment>
          <Comment>
            <span className="avatar"><Icon className="avatar56" /><span className="blind">avatar</span></span>
            <Comment.Content>
              <span className="empty h56">삭제된 댓글입니다.</span>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="left postset edit2"><Icon className="edit2" />Edit</Button>
                  <Button icon className="left postset delete"><Icon className="delete" />Delete</Button>
                  <Button icon className="left postset reply2"><Icon className="reply2" />Reply</Button>
                </div>
                <Button className="cmt">View Replies</Button>
                <span className="count">3</span>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          {/* comment : 댓글 확장 */}
          <Comment>
            <Comment.Avatar src="/images/all/profile-56-px.png" />
            <Comment.Content>
              <Comment.Author as="a">김연아</Comment.Author>
              <Comment.Metadata>
                <span className="date">2019.10.23</span>
              </Comment.Metadata>
              <Comment.Text>
                <div className="ellipsis">
                  {/* .expend // */}
                  <span>이거 진짜 안들으면 후회합니다.</span>
                </div>
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="left postset edit2"><Icon className="edit2" />Edit</Button>
                  <Button icon className="left postset delete"><Icon className="delete" />Delete</Button>
                  <Button icon className="left postset reply2"><Icon className="reply2" />Reply</Button>
                </div>
                <Button className="cmt">View Replies</Button>
                <span className="count">2</span>
              </Comment.Actions>
            </Comment.Content>

            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/images/all/profile-56-px.png" />
                <Comment.Content>
                  <Comment.Author as="a">김연아</Comment.Author>
                  <Comment.Metadata>
                    <span className="date">2019.10.23</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    <div>
                      <span className="tag">@강다니엘</span>
                      <span>대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.대댓글은 말줌임이 없습니다.</span>
                    </div>
                  </Comment.Text>
                  <Comment.Actions>
                    <div className="right top">
                      <Button icon className="left postset edit2"><Icon
                        className="edit2"
                      />Edit
                      </Button>
                      <Button icon className="left postset delete"><Icon
                        name="delete"
                      />Delete
                      </Button>
                    </div>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
            <Comment.Group>
              <Comment>
                <span className="avatar"><Icon className="avatar56" /><span className="blind">avatar</span>
                </span>
                <Comment.Content>
                  <span className="empty h56">삭제된 댓글입니다.</span>
                </Comment.Content>
              </Comment>
            </Comment.Group>
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/images/all/profile-48-px.png" />
                <Comment.Content>
                  <Comment.Author as="a">김연아</Comment.Author>
                  <Comment.Metadata>
                    <span className="date">2019.10.23</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    <div>
                      <span className="tag">@강다니엘</span>
                      <span>대댓글은 말줌임이 없습니다.</span>
                    </div>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>
          {/* comment : 본인 댓글 수정 */}
          <Comment>
            <Comment.Avatar src="/images/all/profile-56-px.png" />
            <Comment.Content>
              <Comment.Author as="a">김연아</Comment.Author>
              <Comment.Metadata>
                <span className="date">2019.10.23</span>
              </Comment.Metadata>
              <Comment.Text>
                {/*<div>*/}
                {/*    <span className="tag">@강다니엘</span>*/}
                {/*    <span>대댓글은 말줌임이 없습니다.</span>*/}
                {/*</div>*/}
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="left postset edit2 active"><Icon className="edit2" />Edit</Button>
                  <Button icon className="left postset delete"><Icon className="delete" />Delete</Button>
                  <Button icon className="left postset reply2"><Icon className="reply2" />Reply</Button>
                </div>
              </Comment.Actions>
              <Form reply className="base">
                <div className="outline">
                  <Form.TextArea placeholder="Writing...">본인 댓글 수정</Form.TextArea>
                  <div className="more">
                    <div className="count"><span className="now">0</span>/<span className="max">500</span>
                    </div>
                    <Button cancel>Cancel</Button>
                    <Button submit>Submit</Button>
                  </div>
                </div>
              </Form>
            </Comment.Content>
          </Comment>
          <Comment>
            <span className="avatar"><Image src="/images/all/profile-56-px.png" /></span>
            <Comment.Content>
              <Comment.Author as="a">김연아</Comment.Author>
              <Comment.Metadata>
                <span className="date">2019.10.23</span>
              </Comment.Metadata>
              <Comment.Text>
                <div className="ellipsis">
                  {/* expend */}
                  <span className="tag">@강하늘</span>
                  <span>이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요.</span>
                </div>
                <Button>+ View more</Button>
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="left postset edit2"><Icon className="edit2" />Edit</Button>
                  <Button icon className="left postset delete"><Icon className="delete" />Delete</Button>
                  <Button icon className="left postset reply2"><Icon className="reply2" />Reply</Button>
                </div>
              </Comment.Actions>
            </Comment.Content>
            {/* comments */}
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/images/all/profile-48-px.png" />
                <Comment.Content>
                  <Comment.Author as="a">김연아</Comment.Author>
                  <Comment.Metadata>
                    <span className="date">2019.10.23</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    <div>
                      <span className="tag">@강다니엘</span>
                      <span>이전 작성 대댓글</span>
                    </div>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>
            {/* comments */}
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/images/all/profile-48-px.png" />
                <Comment.Content>
                  <Comment.Author as="a">김연아</Comment.Author>
                  <Comment.Metadata>
                    <span className="date">2019.10.23</span>
                  </Comment.Metadata>
                  <Comment.Actions>
                    <div className="right top">
                      <Button icon className="left active postset edit2"><Icon className="edit2" />Edit</Button>
                      <Button icon className="left postset delete"><Icon
                        name="delete"
                      />Delete
                      </Button>
                    </div>
                  </Comment.Actions>
                  <Form reply className="base">
                    <div className="outline">
                      <Form.TextArea placeholder="Writing..." />
                      {/* tag-menu */}
                      <div className="tag-menu"
                        style={{ position: 'absolute', left: '20px', top: '50px' }}
                      >
                        <Button className="item" data-value="">
                          <span className="pic"><Image
                            src="/images/all/profile-38-px.png"
                          />
                          </span>
                          <span className="info"><span className="name"><span className="match">성</span>춘향</span>
                            <span className="co">SK C&C / 플랫폼 사업 1팀</span>
                          </span>
                          <span className="mail">Chunhyang.sung@sk.com</span>
                        </Button>
                        <Button className="item" data-value="">
                          <span className="pic"><Image
                            src="/images/all/profile-38-px.png"
                          />
                          </span>
                          <span className="info"><span className="name"><span className="match">성</span>춘향</span>
                            <span className="co">SK C&C / 플랫폼 사업 1팀</span>
                          </span>
                          <span className="mail">Chunhyang.sung@sk.com</span>
                        </Button>
                        <Button className="item" data-value="">
                          <span className="pic"><Image
                            src="/images/all/profile-38-px.png"
                          />
                          </span>
                          <span className="info"><span className="name"><span className="match">성</span>춘향</span>
                            <span className="co">SK C&C / 플랫폼 사업 1팀</span>
                          </span>
                          <span className="mail">Chunhyang.sung@sk.com</span>
                        </Button>
                        <Button className="item" data-value="">
                          <span className="pic"><Image
                            src="/images/all/profile-38-px.png"
                          />
                          </span>
                          <span className="info"><span className="name"><span className="match">성</span>춘향</span>
                            <span className="co">SK C&C / 플랫폼 사업 1팀</span>
                          </span>
                          <span className="mail">Chunhyang.sung@sk.com</span>
                        </Button>
                        <Button className="item" data-value="">
                          <span className="pic"><Image
                            src="/images/all/profile-38-px.png"
                          />
                          </span>
                          <span className="info"><span className="name"><span className="match">성</span>춘향</span>
                            <span className="co">SK C&C / 플랫폼 사업 1팀</span>
                          </span>
                          <span className="mail">Chunhyang.sung@sk.com</span>
                        </Button>
                        <Button className="item" data-value="">
                          <span className="pic"><Image
                            src="/images/all/profile-38-px.png"
                          />
                          </span>
                          <span className="info"><span className="name"><span className="match">성</span>춘향</span>
                            <span className="co">SK C&C / 플랫폼 사업 1팀</span>
                          </span>
                          <span className="mail">Chunhyang.sung@sk.com</span>
                        </Button>
                        <Button className="item" data-value="">
                          <span className="pic"><Image
                            src="/images/all/profile-38-px.png"
                          />
                          </span>
                          <span className="info"><span className="name"><span className="match">성</span>춘향</span>
                            <span className="co">SK C&C / 플랫폼 사업 1팀</span>
                          </span>
                          <span className="mail">Chunhyang.sung@sk.com</span>
                        </Button>
                      </div>
                      <div className="more">
                        <div className="count"><span className="now">0</span>/<span className="max">500</span>
                        </div>
                        <Button cancel>Cancel</Button>
                        <Button submit>Submit</Button>
                      </div>
                    </div>
                  </Form>
                </Comment.Content>
              </Comment>
            </Comment.Group>
            {/* .comments */}
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/images/all/profile-48-px.png" />
                <Comment.Content>
                  <Comment.Author as="a">김연아</Comment.Author>
                  <Comment.Metadata>
                    <span className="date">2019.10.23</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    <div>
                      <span className="tag">@강다니엘</span>
                      <span>이전 작성 대댓글</span>
                    </div>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>
            {/* more */}
            <div className="more">
              <Button>more replies(<span className="count">15</span>)</Button>
            </div>
          </Comment>
          {/* comment : 대댓글 입력 */}
          <Comment>
            <Comment.Avatar src="/images/all/profile-56-px.png" />
            <Comment.Content>
              <Comment.Author as="a">김연아</Comment.Author>
              <Comment.Metadata>
                <span className="date">2019.10.23</span>
              </Comment.Metadata>
              <Comment.Text>
                <div className="ellipsis">
                  <span className="tag">@강하늘</span>
                  <span>이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요. text width 640px text width 이거 진짜 안들으면 후회합니다. 최고의 강사가 귀에 쏙쏙 들어오게 강의하네요.</span>
                </div>
                <Button>+ View more</Button>
              </Comment.Text>
              <Comment.Actions>
                <div className="right top">
                  <Button icon className="left postset edit2"><Icon className="edit2" />Edit</Button>
                  <Button icon className="left postset delete"><Icon className="delete" />Delete</Button>
                  <Button icon className="left active postset reply2"><Icon
                    className="reply2"
                  />Reply
                  </Button>
                </div>
              </Comment.Actions>
              <ReplyForm02 />
            </Comment.Content>
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/images/all/profile-48-px.png" />
                <Comment.Content>
                  <Comment.Author as="a">김연아</Comment.Author>
                  <Comment.Metadata>
                    <span className="date">2019.10.23</span>
                  </Comment.Metadata>
                  <Comment.Text>
                    <div>
                      <span className="tag">@강다니엘</span>
                      <span>이전 작성 대댓글</span>
                    </div>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            {/* more */}
            <div className="more">
              <Button>more replies(<span className="count">15</span>)</Button>
            </div>
          </Comment>

        </Comment.Group>
        {/* more-comments */}
        <div className="more-comments">
          <Button icon className="left moreview">
            <Icon className="moreview" /> more comments (15)
          </Button>
        </div>
      </Comment.Content>
    );
  }
}


export default CommentContents;
