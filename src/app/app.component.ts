import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Tutorial';
  createProduct: boolean;
  message: string;

  onCreateProduct() {
    this.createProduct = true;
    this.message = '';
  }

  onProductSubmit(data) {
    this.createProduct = false;
    this.message = data.message;
  }
}
