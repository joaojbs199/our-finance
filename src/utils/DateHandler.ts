export class DateHandler {
  /**
   * Get the total days of month
   * @param year
   * @param month
   * @returns Total days of month
   */
  static getMonthLength(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

  /**
   * Get the atual month
   * @returns Atual month
   */
  static getYearMonth = () => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  };

  /**
   * Convert dd/mm/aaaa date format to yyyy-mm-dd date format
   * @param date
   */
  static formatDateISO(date: string) {
    const splitDate = date.split('/');
    const dateISO = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    return dateISO;
  }

  /**
   * Convert yyyy-mm-dd date format to dd/mm/aaaa date format
   * @param isoDate
   * @returns date in dd/mm/aaaa format
   */
  static formatDateBR(isoDate: Date) {
    const receivedDate = new Date(isoDate);
    const convertedDate = receivedDate.toLocaleDateString('pt-BR');
    return convertedDate;
  }
}
