import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import BadgeView from '../../../../../certification/ui/view/BadgeView';
import LectureBadge from '../../../viewModel/LectureOverview/LectureBadge';
import BadgeSize from '../../../../../certification/ui/model/BadgeSize';
import BadgeStyle from '../../../../../certification/ui/model/BadgeStyle';
import { Area } from 'tracker/model';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface LectureBadgeViewProps {
  lectureBadge: LectureBadge;
}

const LectureBadgeView: React.FC<LectureBadgeViewProps> =
  function LectureBadgeView({ lectureBadge }) {
    return (
      <>
        <div
          className="badge-detail"
          id="lms-related-badge"
          data-area={Area.CARD_BADGE}
        >
          <div className="ov-paragraph">
            <div className="section-head">
              <div className="title">
                <h3 className="title-style">
                  <Label className="onlytext bold size24">
                    <Icon className="lms-badge" />
                    <span>
                      {/*Tag*/}
                      <PolyglotText
                        defaultString="관련 Badge"
                        id="Course-Contents-관련 Badge"
                      />
                    </span>
                  </Label>
                </h3>
              </div>
            </div>
            <div className="scrolling lms-badge-list">
              <div className="badge-list-type">
                <ul className="belt">
                  {lectureBadge.badges.map((bundle) => {
                    const { badge, badgeCategory } = bundle;
                    return (
                      <li>
                        <BadgeView
                          id={badge.id}
                          name={parsePolyglotString(
                            badge.name,
                            getDefaultLang(badge.langSupport)
                          )}
                          level={badge.level}
                          iconUrl={badge.iconUrl}
                          categoryId={badgeCategory.id}
                          badgeSize={BadgeSize.Small}
                          badgeStyle={BadgeStyle.List}
                          badgeColor={badgeCategory.themeColor}
                          backgroundImagePath={
                            badgeCategory.backgroundImagePath
                          }
                          topImagePath={badgeCategory.topImagePath}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default LectureBadgeView;

const REPRESENT_ICON_POLYGLOT_URL: PolyglotString = {
  ko: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDMxIDIwIj4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8Zz4NCiAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NDkgLTEyMjEpIHRyYW5zbGF0ZSg0MDAgMTU5KSB0cmFuc2xhdGUoMCA0MTMpIHRyYW5zbGF0ZSgwIDU1NCkgdHJhbnNsYXRlKDQ5IDk1KSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjE5IiB4PSIuNSIgeT0iLjUiIGZpbGw9IiNGRkYiIHN0cm9rZT0iI0ZGNjY0RCIgcng9IjkuNSIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGZpbGw9IiNGRjY2NEQiIGZvbnQtZmFtaWx5PSJOb3RvU2Fuc0NKS2tyLUJvbGQsIE5vdG8gU2FucyBDSksgS1IiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBsZXR0ZXItc3BhY2luZz0iLS40Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjYuNyIgeT0iMTQiPuuMgO2RnDwvdHNwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZXh0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=',
  en: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAECbtZsAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAkn8bdAAAD3klEQVRIDaWWf2hWZRTHP/fNMkzCVNRVhDVsqTjKX1CgRgQastf8YwbCaCS8r1kh/SHuj2UjyMoF/pGhk8rBrKBorf1RzH6IvvaD9gOUjXAaFU3frRiZ23S23Omc59m92x13ae3Avfc85znfc85znvOc5wYoSSZ9Wt/3QrDJDcRoaMh9AqehrH0jkkyJ2OMETm/4qsj+3Y5FBvod417Z9J5kG6GxXVsthJJ3I8ienSIXekWaj4vUvObE3kImXaqqH4RAjbczONhY5IN4IRsZGM+YQmBCXtwGv52H4pUwfwE8pgaNshs6U57T97TpULoFGurgy8YRsbQgupSY6Z5zfqjLjcBSVZWSf4klZsAGpqsYZ0B3ojRSaMmJ5I6IXNXMXg8pdgoB70ShNL4Hv+ehoxVOn4InMnDiCHS2Q42u68O3/TpDgGGlJnOjdLYn++u76OXZtMilkS2+MuhlhlFsaAvZumGj7K0U6e5KNmZSmzMd1Q2Bbqdt4Ky15msJgjQiuifjKAj6Vd7IsoLyIHtwKJp12zTREsbHYnq6rQ7sQh5buuOVk8amr+GnKFpSz7RbfBS5Jvj5TBTRhIzpKy6wRDD3Dq93aC9sfBJaT2jVajouDcA990FvDwz9BY+UjNrrOUeKGbNGBd8fg53lsHodnOmA7i7o+glWrYVPx5wcQ8yYqeDm46PglWvgoUfhb02mFc76TX6uow36/oRfzsJljcaoOWenNn02KSeRrKk+YmOM4pwRqa6IyWODpJ1QfQcMXy6CXJPI4OUYNhqY3OZDjwqMKiwyYuU3LNUsLC5k+SpYsFiTo0mdenOocu3vlUG40OuT3qK5+eHUj6SCHcGBTz5OBLsqteUnLTMKfxKM2TX7YXVbFO5026Zd7/GYhH8HNT/mTzvDFOwwlz1b6NI7NifWlAf6YPZcyP8KN02Fitdh1pyxWv+dt20se6aQun212hi1i6xYnWxk8VIo3w4nm2H/y/7oHvsMvv0K1uhB+u4oPLwehofho0Nwt16Vt82Gtm9g+0uw6P5ku+bv8JvpFMJ5VxxJav0XoV07dM0rsPlpeOBB+KIBZqqDP7Sgiop9dkKsZSZb4bNj3XwismJUvymdr+T9A8lq02+FJStg91v+OqivhV37fJ8x43byC+7y2NQNUK2Os2mYdyc89Tx8/Tls096tfShG3l+lk7m2arfc/6106yL2v3EtMvvmZ+Q2ic65u17zba8yp2AHZc/58x0LdxIDa7J1b+hfRb6agqUVQVWVFklCkzGhv9K6H1dOn2C5tqLbE682U04id+VpLaF/IwQNLJvXELv6RjD/ADIBecugy5cOAAAAAElFTkSuQmCC',
  zh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAUCAYAAAECbtZsAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAH6ADAAQAAAABAAAAFAAAAAAkn8bdAAAEcklEQVRIDbWWfUzVVRjHP78LhgY1BGVAQzM0YgYrwC2X1mab2gqwFzH/YMNlXFuW+gfFGhobtbWoqWttQqss1hrVUNkc1dJZuFkTrfWiCUJGJVSYZpeX5OX0PL9zf/devDd62Trbub9znvN9nuec83yf51wHaaay5JT8Xg9OmTsxdZuMGRo0ZqDfOC7CGKPfUDOVxUa7CnyyaMi9yV10x2YwoF/b/CXPxbbhGdu2QbdQ/KYLV88bSo1ped2Y0VHPRnAXlSWrBfq2pyj77XQaW3Os463+EPrygQIcFXLqS7g0AnvegMw51tD6KvCXdvrcWU4e5C2ChQVw+iR0HLYgTAdGjnK5aXcuxw2iZHu1tT4zxV6iDChWdNSAI5FYTcO+8Alr/PB0A5z4DI4chDnZ8Okh+L4Hsq6DwlvhTrkUbf7SsngcXrUz+e1oh+kz7PSjNnj4STjTZXtaJiwrhh/PhOCq66MgPYWur62waCmkptnxui3w2na5tbkwcxaUrYf5udDXa9dVR3W9JlG8x2yvMab/h6gjhwS6phjBenouV3RiGiqncaxvN45TgjFJHiD0dZyAyFspzKhw/I2jIbkbps6vQk6mHChOwuoqu1uOpO6UmsFFxcv248nJa+HKRLuL8XH4oEX6HhuyLXUSxs0wPiZB9knKSK/ZgYsXPR9rJQe89liZxHUJTLsCEhJwOZt+DcxKh9nSdew10YsnOdWbwqpySMuwxFjzkJU7cqc7tsIM2d3iO8LY5BRRPvoxLFluhXHx9rviPuiRkhC4KHOhtr8afjsfJpOijrbjo+mlbqshv4nBCIlVjhyQLCqED1thTM5820rIyApBQ3qmvvqf3HEYI/iwFRlJwpw27e8bMzIcBkWOVK7rgvMUQwzzBC79Jkw9ufnZKOcXLMS91ITpHuTvv39IVblwDjd3NPFOftGNz6lydu0TDsRoLkv1+P+WcJGnm2qsdtW+x27dg+aUe2V/lR5nvzPmwjlr9vNPjAlcNKa325jx8WhXw0PGtL0rZfpS9JonUT8aIvEbV5uZ2UT5xtu5eXH0fRwQpuyWjFh5P8QLDXc+JYyRAp01D5pfhhvy4fwAHNpvr/jEcdjfLCcSPnR/Y2WJV8HVyWHbWrpmpqbw3sFsR67hd3Y2JxEZU03HJ9bBxASkzIYkMfDLTzAckEzTJJIs1IxTPrzyAowMW+NjUmx6hfnXLpBUjrMypf/GbWHnOlJObFoT8EkOnXXJEbmsyfZ8E9y91ko318EzjXBvBfwqJ10uJTF/EcSJg7nzLbl65KRLV0BDMK+03gz0wy3LIi3bsZJR/EqloYa3dkUDYkm0EuTcCI9XQPWD8G2XDcldD9jy0fYOPCLVIa8I5skfhkG5qWOH5caGJluz/mpcoVtW9ZX7v5jukU3tq5/gaxLKc/d57Tv+rBTGKsoftfGcvN//PtN3r+lF+LmvnoyCaqe2VsgkVT6WRfuk9a+SwEh3igSVGfNpi6XsWtUnT7ik/0Zw9lKYvnfS0xfU+xMrfOjn8L4GdAAAAABJRU5ErkJggg==',
};

// ko image
// const REPRESENT_IMAGE =
//   'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDMxIDIwIj4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8Zz4NCiAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NDkgLTEyMjEpIHRyYW5zbGF0ZSg0MDAgMTU5KSB0cmFuc2xhdGUoMCA0MTMpIHRyYW5zbGF0ZSgwIDU1NCkgdHJhbnNsYXRlKDQ5IDk1KSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjE5IiB4PSIuNSIgeT0iLjUiIGZpbGw9IiNGRkYiIHN0cm9rZT0iI0ZGNjY0RCIgcng9IjkuNSIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGZpbGw9IiNGRjY2NEQiIGZvbnQtZmFtaWx5PSJOb3RvU2Fuc0NKS2tyLUJvbGQsIE5vdG8gU2FucyBDSksgS1IiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBsZXR0ZXItc3BhY2luZz0iLS40Ij4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjYuNyIgeT0iMTQiPuuMgO2RnDwvdHNwYW4+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZXh0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=';
