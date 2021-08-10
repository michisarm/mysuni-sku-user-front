import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps } from 'react-router-dom';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import InstructorContentHeaderView from '../view/InstructorContentHeaderView';
import InstructorIntroduceView from '../view/InstructorIntroduceView';
import { CardWithCardRealtedCount } from '../../../lecture/model/CardWithCardRealtedCount';
import { findByRdoCache } from '../../../lecture/detail/api/cardApi';
import { InstructorLecturesView } from '../view/InstructorLecturesView';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';
import { findInstructorWithIdentityCache } from 'expert/apis/instructorApi';

const PAGE_SIZE = 8;

interface Props extends RouteComponentProps<RouteParams> {}

interface State {
  cardsTotalCount: number;
  cards: CardWithCardRealtedCount[];
  instructorWithIdentity: InstructorWithIdentity | null;
}

interface RouteParams {
  instructorId: string;
  tab: ContentType;
}

enum ContentType {
  Introduce = 'Introduce',
  Lecture = 'Lecture',
}

@reactAutobind
class InstructorPage extends Component<Props, State> {
  //

  constructor(props: Props) {
    super(props);
    this.state = {
      cardsTotalCount: 0,
      cards: [],
      instructorWithIdentity: null,
    };
  }

  componentDidMount() {
    //
    const { match } = this.props;
    const { instructorId } = match.params;
    findInstructorWithIdentityCache(instructorId).then(
      (instructorWithIdentity) => {
        if (instructorWithIdentity !== undefined) {
          this.setState({ instructorWithIdentity });
        }
      }
    );
    this.requestCards();
  }

  requestCards() {
    const { match } = this.props;
    const { instructorId } = match.params;
    const { cards } = this.state;
    findByRdoCache({
      instructorId,
      offset: cards.length,
      limit: PAGE_SIZE,
    }).then((next) => {
      if (next !== undefined) {
        const nextCards = [...cards, ...next.results];
        this.setState({ cards: nextCards, cardsTotalCount: next.totalCount });
      }
    });
  }

  getTabs() {
    //
    const { cardsTotalCount } = this.state;

    return [
      {
        name: ContentType.Introduce,
        item: ContentType.Introduce,
        render: this.renderIntroduce,
      },
      {
        name: ContentType.Lecture,
        item: (
          <>
            Lecture<span className="count">{cardsTotalCount}</span>
          </>
        ),
        render: this.renderLecture,
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel): string {
    //
    const { history, match } = this.props;
    const { params } = match;

    history.push(routePaths.instructorTab(params.instructorId, tab.name));

    return routePaths.instructorTab(params.instructorId, tab.name);
  }

  renderIntroduce() {
    //
    const { instructorWithIdentity } = this.state;

    return (
      <InstructorIntroduceView
        instructorWithIdentity={instructorWithIdentity}
      />
    );
  }

  renderLecture() {
    const { cards, cardsTotalCount } = this.state;
    //
    return (
      <InstructorLecturesView
        cards={cards}
        cardsTotalCount={cardsTotalCount}
        requestMore={this.requestCards}
      />
    );
  }

  render() {
    //
    const { instructorWithIdentity } = this.state;
    const { params } = this.props.match;

    return (
      <ContentLayout className="mylearning" breadcrumb={[{ text: 'Expert' }]}>
        <InstructorContentHeaderView
          instructorWithIdentity={instructorWithIdentity}
        />

        <Tab
          allMounted
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default InstructorPage;
