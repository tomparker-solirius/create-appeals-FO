export function createRefNumber(){
  const now = new Date();
  const dayAbbr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const refNumber = `${dayAbbr}${hours}${minutes}`;
  return refNumber;
}