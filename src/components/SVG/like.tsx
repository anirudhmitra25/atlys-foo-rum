const Like = ({ color = "#2F384C" }) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill={color === "#2F384C" ? "none" : color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 14.75C9.75 14.75 16.5 11.0002 16.5 5.75032C16.5 3.12542 14.25 1.28304 12 1.25049C10.875 1.23421 9.75 1.62549 9 2.75044C8.25 1.62549 7.10554 1.25049 6 1.25049C3.75 1.25049 1.5 3.12542 1.5 5.75032C1.5 11.0002 8.25 14.75 9 14.75Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Like;
