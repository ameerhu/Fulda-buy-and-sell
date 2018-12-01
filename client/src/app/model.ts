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
    this.firstName = 'Ammar';
    this.lastName = 'Hasan';
    this.address = 'WiesenmuhleStr 3';
    this.phone = '+491';
    this.username = 'ammar94';
    this.email = 'hasanammar94@gmail.com';
    this.emailVerified = false;
    this.id = '5c017125b00112f7ff8570ea';
  }
}

export class Product {
  constructor(
    public name: String,
    public location: String,
    public postedDate: Date,
    public description: String,
    public status: String,
    public sold: Boolean,
    public id: String,
    public images: Array<String>,
    public price: Number,
  ) { }

  static approvedUnsoldProductFilters = [
    'filter[include]=owner',
    'filter[include]=category',
    'filter[order]=postedDate%20DESC',
    'filter[where][status]=approved',
    'filter[where][sold]=false',
  ];

  static convertQueryParamsintoFilters(queryParam): Array<String> {
    const filters = [];
    // tslint:disable-next-line:forin
    for (const key in queryParam) {
      switch (key) {
        case 'id':
          filters.push('filter[where][id]=' + queryParam[key]);
          break;
        case 'name':
          filters.push('filter[where][name][ilike]=%' + queryParam[key] + '%');
          break;
        case 'description':
          filters.push('filter[where][description][ilike]=%' + queryParam[key] + '%');
          break;
        case 'location':
          filters.push('filter[where][location][ilike]=' + queryParam[key]);
          break;
        case 'customerId':
          filters.push('filter[where][customerId]=' + queryParam[key]);
          break;
        case 'categoryId':
          filters.push('filter[where][categoryId]=' + queryParam[key]);
          break;
        default:
          break;
      }
    }
    return filters;
  }
}

export class Criteria {
  constructor(
    public area: String,
    public minPrice: number,
    public maxPrice: number,
    public postedDate: Date
  ) {}
}
