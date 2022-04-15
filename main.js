document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
  // записать в куки текущий визит (ключ: visit-[ВРЕМЕННАЯ_МЕТКА], значение: [ССЫЛКА])
  const prefix = 'visit';
  const prefixTimestamp = `${prefix}-${Date.now()}`;
  const url = window.location.href;
  setCookie({ [prefixTimestamp]: url });

  // достать все куки и вывести в консоль (будут представлены в виде объекта)
  const cookie = getCookie();
  console.log(cookie);

  // перебрать все куки, найти визиты, вывести в консоль квери параметры ссылок с датами посещения
  const cookieKeys = Object.keys(cookie);
  const visitCookieKeys = cookieKeys.filter((cookieKey) => {
    return cookieKey.startsWith(prefix);
  });
  visitCookieKeys.forEach((cookieKey) => {
    const timestamp = +cookieKey.split('-')[1];
    const url = cookie[cookieKey];
    const params = getParams(url);
    console.log(new Date(timestamp).toString(), params);
  });
}

function getParams(url) {
  const paramsStr = url.split('?')[1] || '';
  const paramsStrArr = paramsStr.split('&');
  return paramsStrArr.reduce((acc, paramStr) => {
    const chips = paramStr.split('=');
    const key = chips[0];
    const value = chips[1];
    acc[key] = value;
    return acc;
  }, {});
}

function getCookie() {
  const chips = (document.cookie && document.cookie.split(';')) || [];
  return chips.reduce((acc, chip) => {
    const [key, value] = chip.trim().split('=');
    acc[decodeURIComponent(key)] = decodeURIComponent(value);
    return acc;
  }, {});
}

function setCookie(cookie) {
  const keys = Object.keys(cookie);
  keys.forEach((key) => {
    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(cookie[key]);
  });
}