import { NgModule } from "@angular/core";
import { TruncatePipe } from "./trruncate.pipe";

@NgModule({
    declarations: [
        TruncatePipe
    ],
    exports: [
        TruncatePipe
    ]
})
export class PipesModule
{}