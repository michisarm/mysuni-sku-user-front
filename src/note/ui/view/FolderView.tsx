import React, { useState } from 'react';
import { Segment, Accordion, Image, Menu, Table, Select, Button, Label, Icon, Form, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface FolderViewProps { }

const FolderView: React.FC<FolderViewProps> = function FolderView() {

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState('NoteAll');



  const CategoryOptions = [
    { key: '전체', value: '전체', text: '전체' },
    { key: '카테1', value: '카테1', text: '카테1' },
  ]
  const CategoryOptionsDetail = [
    { key: 'AI Trend Watch', value: 'AI Trend Watch', text: 'AI Trend Watch' },
    { key: '카테1', value: '카테1', text: '카테1' },
  ]
  const SearchOptions = [
    { key: '전체', value: '전체', text: '전체' },
    { key: '카테1', value: '카테1', text: '카테1' },
  ]

  const FolderOptions = [
    { key: '폴더 미지정', value: '폴더 미지정', text: '폴더 미지정' },
    { key: '폴더 1', value: '폴더 1', text: '폴더 1' },
  ]

  const handleNote = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? activeIndex - 1 : index;
    setActiveIndex(newIndex);
  };



  return (
    <div>
      <div className="cont-inner">
        <Menu className="note-tab">
          <Menu.Item
            name="NoteAll"
            active={false}
            // onClick={this.handleItemClick}
            as={Link}
            to="/my-training/my-page/EarnedNoteList/pages/1"
          >
            모아보기
          </Menu.Item>
          <Menu.Item
            name="NoteFolder"
            active={true}
            // onClick={this.handleItemClick}
            as={Link}
            to="/my-training/my-page/EarnedNoteList/pages/2"
          >
            폴더보기
          </Menu.Item>

        </Menu>
      </div>

      <Segment className="full">
        {/* 폴더 영역 */}
        {/* <NoteFolderArea /> */}



        {/* 설정버튼 누르기 전 */}
        <div className="total_box">
          <strong className="tit_folder">
            시험대비 벼락치기 폴더
                            <Button className="btn_setting"><Icon /></Button>
          </strong>
                        총 <strong>13개의 Note</strong>
        </div>



        {/* 설정버튼 누르기 후 */}
        {/* <FolderSetting/> */}






        {/* 노트 영역 */}
        <div className="note_area">
          {/* 노트 타이틀 */}
          <div className="note_title">
            <div className="tit">
              <Label color="purple">AI</Label>
              <strong className="header">AI/DT 고객 경험 디자인 2021</strong>
              <p>AI/DT 시대의 고객 경험 디자인, 통계부터 머신러닝까지 하루만에 끝내기 2-  미래예측 살펴보기</p>
            </div>

            <div className="option_box">
              <Select placeholder="폴더 미지정" options={FolderOptions} />
            </div>
          </div>
          {/* 노트 펼치기/숨기기 */}
          <Accordion>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleNote}
            >
              <Image src={activeIndex !== 1 ? `${PUBLIC_URL}/images/all/icon-pboard-close.svg` : `${PUBLIC_URL}/images/all/icon-pboard-open.svg`} alt="더보기" />
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 1}>

              {/* 노트 보기 및 작성 */}
              {/* <NoteContent1 /> */}

              <div className="note_content">
                <div className="note_content_total">
                  <strong className="txt">작성한 노트</strong>
                  <span className="cnt">2개</span>

                  {/* 노트 작성 시작하게되면 폰트 색상 및 아이콘 변경이 있습니다.  active 클래스 추가될 경우 폰트 색상(회색--> 청록색 ) 변경됩니다 */}
                  <Button className="btn_write"><Icon /><span>Note</span></Button>
                </div>

                {/* <NoteList1 />

                <NoteWrite /> */}


                {/* note List */}
                <div className="mynote">
                  <div className="note_info">
                    <Link className="time" to="">
                      <Icon><Image src={`${PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`} /></Icon>
                        12:34
                        <Icon className="icongo"><Image src={`${PUBLIC_URL}/images/all/icon-go-a.svg`} /></Icon>
                    </Link>
                    <span className="date">2021년 5월 4일 작성</span>
                  </div>
                  <p className="note">디자인 역량은 Why thinking 과정을 통해 기를 수 있다! 여기서 말하는 Deep change란 ? 디자인 영역에서 중요한 요소. 디자인의 시작은 변화에서 나오며, 사소한 것에서 부터 생각하는 사고력과 변화를 추구하는 창의력이 중요하다. 디자인은 사소한 것에서 부터 시작한다. 우리의 일상과 연관되어 있는 부분이다. 다른 시각에서 바라보는 연습을 시작하면 창의력을 기를 수 있지 않을까. Why thinking 과정을 통해 기를 수 있다! 여기서 말하는 Deep change란 ? 디자인 영역에서 중요한 요소. 디자인의 시작은 변화에서 나오며, 사소한 것에서 부터 생각하는 사고력과 변화를 추구하는 창의력이 중요하다.</p>
                </div>

                <div className="mynote mynote_write">
                  <div className="note_info">
                    <Link className="time" to="">
                      <Icon><Image src={`${PUBLIC_URL}/images/all/icon-card-time-16-px-green.svg`} /></Icon>
                        15:04
                        <Icon className="icongo"><Image src={`${PUBLIC_URL}/images/all/icon-go-a.svg`} /></Icon>
                    </Link>
                    <span className="date">2021년 5월 4일 작성</span>
                  </div>
                  <Form>
                    <TextArea placeholder="내용을 입력하시오" />
                    <span className="txt_cnt">
                      <span className="txt_now">00</span>
                        /<span>1000</span>
                    </span>
                  </Form>
                  <div className="note_btn">
                    <Button className="delete"><Image src={`${PUBLIC_URL}/images/all/icon-list-delete-24-px.svg`} /></Button>
                    <Button className="cancel">취소</Button>
                    <Button className="save">저장</Button>
                  </div>
                </div>


              </div>

            </Accordion.Content>
          </Accordion>
        </div>
      </Segment>
    </div>
  )
};

export default FolderView;
