import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-pop-over',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopOverComponent implements OnInit {
  @Input()
  message: string = 'Are you sure you want to delete?'

  @Output()
  onConfirm = new EventEmitter<void>();

  @Output()
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
