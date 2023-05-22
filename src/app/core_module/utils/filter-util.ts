export class FilterUtil {

  static filterObjectIfIdMatched(data: any, id: any) {
    const filteredObj = Object.keys(data)
      .filter((key: any) => data[key].id === id)
      .reduce((acc: any, key: any) => {
        acc[key] = data[key];
        return acc;
      }, {});
    return filteredObj;
  }
}
