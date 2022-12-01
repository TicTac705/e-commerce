import {Component} from '@angular/core';

import {ngxLoadingAnimationTypes} from "ngx-loading";
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {
  public config = {
    animationType: ngxLoadingAnimationTypes.doubleBounce,
    primaryColour: '#e50d28',
    secondaryColour: '#fdc007',
    fullScreenBackdrop: true,
  };

  constructor(public loader: LoaderService) {
  }
}
