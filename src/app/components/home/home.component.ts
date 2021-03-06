import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public game: GameService) { }

}
