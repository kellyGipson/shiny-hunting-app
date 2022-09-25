import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { CurrentHunt } from "src/app/types/currentHunts.types";

@Component({
  selector: 'app-pop-over',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopOverComponent implements OnInit {
  @Input()
  message: string = 'Are you sure you want to delete?'

  @Input()
  onConfirm = new EventEmitter<void>();

  @Input()
  onCancel = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
