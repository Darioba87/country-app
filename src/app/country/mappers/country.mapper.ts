import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {
  // Static restCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    }
  }
  // static Rescountry => Country[]
  static mapRestCountryArrayToCountryArray(resCountry: RESTCountry[]): Country[] {
    return resCountry.map(this.mapRestCountryToCountry)
  }
}
