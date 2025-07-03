import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/notFound/notFound.component';
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  contryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService)

  contryResource = rxResource({
    request: () => ({ code: this.contryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryAlphaCode(request.code)
    },
  });

}
