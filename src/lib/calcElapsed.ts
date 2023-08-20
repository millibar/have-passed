/**
 * 日付を現地時間の文字列にする
 * toLocaleDateString(new Date(2023, 7, 18, 1, 0, 0), ['ja-JP']) => '2023年8月18日'
 * @param date 日付
 * @param locales 日本なら['ja-JP']、デフォルトなら空の配列
 * @returns '2023年8月19日'のような文字列
 */
export const toLocaleDateString = (date: Date, locales: string[]): string => {
  return Intl.DateTimeFormat(locales, {
    dateStyle: 'long',
  }).format(date);
};

/**
 * 始点から終点までの経過時間に応じた文字列を返す
 * 1分未満のとき、just now
 * 3時間45分のとき、 3.8 hours
 * 5日のとき、5 days
 * @param fromUTC 始点のUTCタイムスタンプ
 * @param toUTC 終点のUTCタイムスタンプ
 * @returns
 */
export const elapsedString = (fromUTC: number, toUTC: number): string => {
  const diff_s = (toUTC - fromUTC) / 1000;

  if (diff_s < 60) return 'just now';

  if (diff_s < 120) return '1 min';

  if (diff_s < 3600) return `${Math.floor(diff_s / 60)} min`;

  if (diff_s < 3960) return '1 hour'; // 3960 ÷ 3600 = 1.1なので、1.1時間未満は1時間とする

  if (diff_s < 3600 * 24)
    return `${Math.round((diff_s / 3600) * 10) / 10} hours`;

  if (diff_s < 3600 * 24 * 2) return '1 day';

  return `${Math.floor(diff_s / (3600 * 24))} days`;
};

/**
 * 始点から終点までが現地時刻で
 * 同じ日付なら始点の時刻を文字列（hh:mm）で返す
 * 異なる日付なら始点の日付を文字列（yyyy/mm/dd）で返す
 * @param fromUTC 始点のUTCタイムスタンプ
 * @param toUTC 終点のUTCタイムスタンプ
 * @param locales 日本なら['ja-JP']、デフォルトなら空の配列
 * @returns
 */
export const toLocaleDateOrTimeString = (
  fromUTC: number,
  toUTC: number,
  locales: string[],
): string => {
  const fromDate = new Date(fromUTC);
  const toDate = new Date(toUTC);

  const isSameDate =
    fromDate.toLocaleDateString() === toDate.toLocaleDateString();

  const options: object = isSameDate
    ? {
        hour: 'numeric',
        minute: 'numeric',
      }
    : {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };

  return Intl.DateTimeFormat(locales, options).format(fromDate);
};
