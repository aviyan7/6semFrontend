import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {throwIfAlreadyLoaded} from './auth-guards/module-import-guard';

const IMPORTS_EXPORTS = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
];

const DATA_SERVICES: Array<any> = [];

export const CORE_PROVIDERS: Array<any> = [...DATA_SERVICES];

const UTILITY_MODULES: Array<any> = [];

@NgModule({
  imports: [CommonModule, ...UTILITY_MODULES, ...IMPORTS_EXPORTS],
  exports: [...UTILITY_MODULES, ...IMPORTS_EXPORTS],
  declarations: [],
  entryComponents: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return <ModuleWithProviders<CoreModule>>{
      ngModule: CoreModule,
      providers: [...CORE_PROVIDERS],
    };
  }

  static forChild(): ModuleWithProviders<CoreModule> {
    return <ModuleWithProviders<CoreModule>>{
      ngModule: CoreModule,
      providers: [...CORE_PROVIDERS],
    };
  }
}
