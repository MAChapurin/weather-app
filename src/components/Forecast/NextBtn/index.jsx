export function NextBtn({cb, disabled}) {
  return (
    <button onClick={cb} className="btn-slider-next" disabled={disabled} aria-label="Следующая карточка">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
      >
        <circle cx="19" cy="19" r="19" fill="none" />
        <path
          d="M15 13.5L24.1265 19.1497C24.758 19.5407 24.758 20.4593 24.1265 20.8503L15 26.5"
          stroke="#ACACAC"
          strokeWidth="3"
        />
      </svg>
    </button>
  );
}
