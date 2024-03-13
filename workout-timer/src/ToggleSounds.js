import { memo } from "react";

const ToggleSounds = memo(function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() =>
        setAllowSound((allow) => {
          return !allow;
        })
      }
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
});

export default ToggleSounds;
