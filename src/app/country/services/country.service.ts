import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = "https://restcountries.com/v3.1";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  /**
   * Search by capital
   * @param query
   * @returns
   */
  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError(error => {
          console.log(error);
          return throwError(() => new Error(`Could not obtain capitals with the query ${query}`))
        })
      )
  }

  /**
   * Search by Country
   * @param query
   * @returns
   */
  searchByCountry(query: string) {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        // delay(3000),
        catchError(error => {
          console.log(error);

          return throwError(() => new Error(`Could not obtain countries with the query ${query}`))
        })
      )

  }


  searchCountryAlphaCode(code: string) {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map(countries => countries.at(0)),
        catchError(error => {
          console.log(error);

          return throwError(() => new Error(`Could not obtain countries with the code ${code}`))
        })
      )

  }

}
