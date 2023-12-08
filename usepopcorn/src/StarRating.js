import { useState } from "react";

function Star({
  full,
  color,
  size,
  onClickStar,
  onMouseOutStar,
  onMouseOverStar,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      onClick={onClickStar}
      onMouseLeave={onMouseOutStar}
      onMouseEnter={onMouseOverStar}>
      {full ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill={color}
          stroke={color}>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke={color}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </span>
  );
}

export default function StarRating({
  length = 5,
  color = "#fcc419",
  size = 24,
  className = "",
  defaultIndex = -1,
  message = [],
  setFullStarNum = () => {},
}) {
  const [index, setIndex] = useState(defaultIndex);
  const [tempIndex, setTempIndex] = useState(defaultIndex);

  return (
    <div className={`${className} rating`}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: length }, (v, i) => {
          return (
            <Star
              key={i}
              color={color}
              size={size}
              onClickStar={() => {
                setIndex(i);
                setTempIndex(i);
              }}
              onMouseOverStar={() => {
                setTempIndex(i);
                setFullStarNum(i + 1);
              }}
              onMouseOutStar={() => setTempIndex(index)}
              full={tempIndex >= i}
            />
          );
        })}
        <span
          style={{
            color: color,
            fontSize: size / 1.3,
            display: "block",
            marginLeft: "16px",
            lineHeight: "1",
          }}>
          {tempIndex + 1 === 0
            ? ""
            : message.length === length
            ? message[tempIndex]
            : tempIndex + 1}
        </span>
      </div>
    </div>
  );
}
