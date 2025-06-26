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
      name: restCountry.demonyms.eng.f,
      population: restCountry.population
    }
  }
  // static Rescountry => Country[]
  static mapRestCountryArrayToCountryArray(resCountry: RESTCountry[]): Country[] {
    return resCountry.map(this.mapRestCountryToCountry)
  }
}
