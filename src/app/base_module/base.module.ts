import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, ModuleWithProviders, Provider} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {SpinnerComponent} from '../core_module/components/spinner/spinner.component';

const BASE_MODULES: Array<any> = [
  RouterModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
];

const COMPONENTS: Array<any> = [
  SpinnerComponent,
];

const ENTRY_COMPONENTS: Array<any> = [];

const PIPES: Array<any> = [DatePipe];

const DIRECTIVES: Array<any> = [];

const THEME_PROVIDERS: Provider = [];

@NgModule({
  imports: [CommonModule, ...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS, ...DIRECTIVES],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  entryComponents: [...ENTRY_COMPONENTS],
  providers: [...PIPES],
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return <ModuleWithProviders<BaseModule>>{
      ngModule: BaseModule,
      providers: [THEME_PROVIDERS],
    };
  }

  static forChild(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [THEME_PROVIDERS],
    };
  }
}
