import { Component, OnInit } from "@angular/core";
import { AppService } from "./services/app/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
  constructor(
    private readonly _appService: AppService,
  ) {}

  ngOnInit(): void {
    this._appService.initApp();
  }
}
