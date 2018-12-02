export class Customer {
  constructor(
    public id?: String,
    public firstName?: String,
    public lastName?: String,
    public address?: String,
    public phone?: String,
    public email?: String,
    public username?: String,
    public emailVerified?: Boolean,
    public owns?: Array<Product>
  ) {
  }
  static fake = {
    firstName: 'Ammar',
    lastName: 'Hasan',
    address: 'WiesenmuhleStr 3',
    phone: '+491',
    username: 'ammar94',
    email: 'hasanammar94@gmail.com',
    emailVerified: false,
    id: '5c017125b00112f7ff8570ea'
  };
}

export class Product {
  constructor(
    public name?: String,
    public location?: String,
    public postedDate?: Date,
    public description?: String,
    public status?: String,
    public sold?: Boolean,
    public id?: String,
    public images?: Array<String>,
    public price?: Number,
    public owner?: Customer,
  ) { }

  static approvedUnsoldProductFilters = [
    'filter[order]=postedDate%20DESC',
    'filter[where][status]=approved',
    'filter[where][sold]=false',
  ];

  static convertQueryParamsintoFilters(queryParam): Array<String> {
    const filters = [];
    // tslint:disable-next-line:forin
    for (const key in queryParam) {
      switch (key) {
        case 'id': filters.push('filter[where][id]=' + queryParam[key]);
          break;
        case 'name': filters.push('filter[where][name][like]=' + queryParam[key] + '&filter[where][name][options]=i');
          break;
        case 'description': filters.push('filter[where][description][like]=' + queryParam[key] + '&filter[where][description][options]=i');
          break;
        case 'location': filters.push('filter[where][location][like]=' + queryParam[key] + '&filter[where][location][options]=i');
          break;
        case 'minPrice': filters.push('filter[where][and][0][price][gt]=' + queryParam[key]);
          break;
        case 'maxPrice': filters.push('filter[where][and][1][price][lt]=' + queryParam[key]);
          break;
        case 'minDate': filters.push('filter[where][and][0][postedDate][gt]=' + queryParam[key]);
          break;
        case 'maxDate': filters.push('filter[where][and][1][postedDate][lt]=' + queryParam[key]);
          break;
        case 'customerId': filters.push('filter[where][customerId]=' + queryParam[key]);
          break;
        case 'categoryId': filters.push('filter[where][categoryId]=' + queryParam[key]);
          break;
        default:
          console.warn('Please add product filter for this queryparam: ', key);
          break;
      }
    }
    return filters;
  }
}

