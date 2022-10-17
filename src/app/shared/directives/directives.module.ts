import { NgModule } from "@angular/core";
import { GridDirective } from "./grid.directive";

@NgModule({
    declarations: [GridDirective],
    exports: [GridDirective]
  })
export class DirectivesModule {}
