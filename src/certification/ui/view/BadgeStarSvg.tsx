import React from 'react';

interface Props {
  color: string;
}

function BadgeStartSvg({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
    >
      <g fill="none" fillRule="evenodd">
        <g fill="#EA012C" fillRule="nonzero">
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      d="M7 10.5L2.886 12.663 3.671 8.082 0.343 4.837 4.943 4.168 7 0 9.057 4.168 13.657 4.837 10.329 8.082 11.114 12.663z"
                      transform="translate(-226 -979) translate(100 421) translate(0 58) translate(0 326) translate(92 174) translate(34 .714)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default BadgeStartSvg;
