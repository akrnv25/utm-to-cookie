document.addEventListener('DOMContentLoaded', updateUserActions);

const USER_ACTIONS_KEY = 'userActions';
const DEFAULT_USER_ACTIONS = {
  firstVisit: null,
  lastVisit: null,
  firstMarkedVisit: null,
  lastMarkedVisit: null
};

// @return void
function updateUserActions() {
  const userActions = getUserActions();
  const visit = { ...parseUrl(window.location.href), timestamp: Date.now() };
  const isMarkedVisit = !!visit.searchParams.length;
  const isFirstVisit = !userActions.firstVisit;
  const updatedUserActions = {
    firstVisit: isFirstVisit ? visit : userActions.firstVisit,
    lastVisit: visit,
    firstMarkedVisit: isFirstVisit && isMarkedVisit ? visit : userActions.firstMarkedVisit,
    lastMarkedVisit: isMarkedVisit ? visit : userActions.lastMarkedVisit
  };
  setCookie([{ key: USER_ACTIONS_KEY, value: JSON.stringify(updatedUserActions) }]);
  console.log(getUserActions()); // todo: remove
}

// @return {
//   firstVisit: { ...parsedUrl, timestamp: number };
//   lastVisit: { ...parsedUrl, timestamp: number };
//   firstMarkedVisit: { ...parsedUrl, timestamp: number };
//   lastMarkedVisit: { ...parsedUrl, timestamp: number };
// }
function getUserActions() {
  const cookie = getCookie();
  const userActionsJSON = cookie.find(c => c.key === USER_ACTIONS_KEY)?.value;
  if (!userActionsJSON) {
    return DEFAULT_USER_ACTIONS;
  }
  try {
    return JSON.parse(userActionsJSON);
  } catch (error) {
    return DEFAULT_USER_ACTIONS;
  }
}

// @url string
// @return {
//   href: string;
//   protocol: string;
//   hostname: string;
//   port: string;
//   pathname: string;
//   searchParams: { key: string; value: string }[];
//   hash: string;
// }
function parseUrl(url) {
  const urlInst = new URL(url);
  const { href, hostname, port, pathname } = urlInst;
  const protocol = urlInst.protocol.replace(':', '');
  const hash = urlInst.hash.replace('#', '');
  const searchParamKeys = Array.from(urlInst.searchParams.keys());
  const searchParams = searchParamKeys.map(key => ({ key, value: urlInst.searchParams.get(key) }));
  return { href, protocol, hostname, port, pathname, searchParams, hash };
}

// @return { key: string; value: string }[]
function getCookie() {
  const chips = document.cookie?.split(';') ?? [];
  return chips.map(chip => {
    const [key, value] = chip.trim().split('=');
    return { key: decodeURIComponent(key), value: decodeURIComponent(value) };
  });
}

// @cookie { key: string; value: string }[]
// @return void
function setCookie(cookie) {
  if (!cookie?.length) {
    return;
  }
  cookie.forEach(c => {
    if (c.key && c.value) {
      document.cookie = encodeURIComponent(c.key) + '=' + encodeURIComponent(c.value);
    }
  });
}