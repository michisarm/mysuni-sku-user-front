import React from 'react';
import { Label, Icon, Rating, Card, Button } from 'semantic-ui-react';
import { Buttons, Field, Fields, Ribbon, SubField, Thumbnail, Title, } from 'lecture/shared/ui/view/LectureElementsView';
import { useState } from 'react';

// DUMMY
const ItemList = [
  {
    ribbon: "핵인싸과정",
    label: "Global",
    header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 어쩌구저쩌구저쩌구어어쩌구)",
    course: "Course",
    time: "1h 30m",
    complete: "이수 3,300명",
    rating: 5,
    hovered: {
      label: "Global",
      header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 웅앵)",
      textArea: "This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three"
    }
  },
  {
    ribbon: "핵인싸과정",
    label: "Global",
    header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 어쩌구저쩌구저쩌구어어쩌구)",
    course: "Course",
    time: "1h 30m",
    complete: "이수 3,300명",
    rating: 5,
    hovered: {
      label: "Global",
      header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 웅앵)",
      textArea: "This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three"
    }
  },
  {
    ribbon: "핵인싸과정",
    label: "Global",
    header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 어쩌구저쩌구저쩌구어어쩌구)",
    course: "Course",
    time: "1h 30m",
    complete: "이수 3,300명",
    rating: 5,
    hovered: {
      label: "Global",
      header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 웅앵)",
      textArea: "This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three"
    }
  },
  {
    ribbon: "핵인싸과정",
    label: "Global",
    header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 어쩌구저쩌구저쩌구어어쩌구)",
    course: "Course",
    time: "1h 30m",
    complete: "이수 3,300명",
    rating: 5,
    hovered: {
      label: "Global",
      header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 웅앵)",
      textArea: "This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three"
    }
  },
  {
    ribbon: "핵인싸과정",
    label: "Global",
    header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 어쩌구저쩌구저쩌구어어쩌구)",
    course: "Course",
    time: "1h 30m",
    complete: "이수 3,300명",
    rating: 5,
    hovered: {
      label: "Global",
      header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 웅앵)",
      textArea: "This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three"
    }
  },
  {
    ribbon: "핵인싸과정",
    label: "Global",
    header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 어쩌구저쩌구저쩌구어어쩌구)",
    course: "Course",
    time: "1h 30m",
    complete: "이수 3,300명",
    rating: 5,
    hovered: {
      label: "Global",
      header: "Mobile App UI/UX GUI Design Tutorials (모바일 앱 UX UI GUI 웅앵)",
      textArea: "This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three"
    }
  }
]

const BoxCard:React.FC = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  const handleHovered = (hover:boolean) => {
    setHovered(hover)
  }

  return (
    <Card.Group className="box-cards">
      {
        ItemList && ItemList.map((item, index) => {
        return (
        <Card key={index} className="card-h" onMouseEnter={() => handleHovered(true)} onMouseLeave={() => handleHovered(false)} >
          {/*tag*/}
          <div className="card-ribbon-wrap">
            <Label className="ribbon2">{/* Required */}{item.ribbon}</Label>
          </div>
          <div className="card-inner">
            {/*썸네일*/}
            <div className="thumbnail"/>
  
            <div className="title-area">
              <Label color="green">{item.label}</Label>
              <div className="header">{item.header}</div>
            </div>
            <div className="icon-area">
                <div className="li">
                  <Label className="bold onlytext">
                    <Icon className="course"/><span>{item.course}</span>
                  </Label>
                </div>
                <div className="li">
                  <Label className="bold onlytext">
                    <Icon className="time2"/><span>{item.time}</span>
                  </Label>
                </div>
                <div className="li">
                  <Label className="onlytext">
                    <Icon className="complete"/><span>{item.complete}</span>
                  </Label>
                </div>
            </div>
            <div className="foot-area">
              <div className="fixed-rating">
                <Rating defaultRating={item.rating} maxRating={5} size="small" disabled className="rating-num"/>
              </div>
            </div>
          </div>
          <div className="hover-content">
            <div className="title-area">
              <div className="ui color green label">{item.hovered.label}</div>
              <div className="header">{item.hovered.header}</div>
            </div>
              <p className="text-area">{item.hovered.textArea}</p>
            <div className="btn-area">
              <Button icon className="icon-line"><Icon className="remove2 icon"/></Button>
              <Button icon className="fix bg">{/* View Details */} 상세보기</Button>
            </div>
          </div>
        </Card>
        )})
      }
    </Card.Group>
  );
};

export default BoxCard;
