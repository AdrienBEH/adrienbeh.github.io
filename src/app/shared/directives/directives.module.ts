import { NgModule } from "@angular/core";
import { ClassValidatorDirective } from "./class-validator.directive";
import { GridDirective } from "./grid.directive";

@NgModule({
    declarations: [GridDirective, ClassValidatorDirective],
    exports: [GridDirective, ClassValidatorDirective]
  })
export class DirectivesModule {}
