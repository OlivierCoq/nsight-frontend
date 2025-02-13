export const detectBrowser = () => {
  const userAgent = navigator.userAgent;

  if (/chrome|crios|crmo/i.test(userAgent)) {
    return 'Chrome';
  } else if (/firefox|fxios/i.test(userAgent)) {
    return 'Firefox';
  } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
    return 'Safari';
  } else if (/msie|trident/i.test(userAgent)) {
    return 'Internet Explorer';
  } else if (/edg/i.test(userAgent)) {
    return 'Edge';
  } else if (/opera|opr\//i.test(userAgent)) {
    return 'Opera';
  } else {
    return 'Unknown';
  }
}