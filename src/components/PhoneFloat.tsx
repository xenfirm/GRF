import { CALL_LINK } from '../constants';

export default function PhoneFloat() {
  return (
    <a
      href={CALL_LINK}
      className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Call Us"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
      </svg>
    </a>
  );
}
