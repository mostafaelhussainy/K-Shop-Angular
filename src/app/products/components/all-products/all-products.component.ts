import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products:any[] = [];
  categories:any[] = [];
  loading:boolean = false;
  constructor (private service:ProductsService) {}
  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }
  getProducts () {
    this.loading = true;
    this.service.getAllProducts().subscribe((res:any) => {
      this.loading = false;
      this.products = res
    }, error => {
      this.loading = false;
      console.error(error.message )
    })
  }
  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe((res:any) => {
      this.loading = false;
      this.categories = res
     } , error => {
      this.loading = false;
      console.error(error.message )
    })
  }
  filterCategory(event:any) {
    let value = event.target.value;
    value == "عرض الكل" ? this.getProducts() : this.getProductsCategory(value)
  }
  getProductsCategory(category:string) {
    this.loading = true;
    this.service.getProductsByCategory(category).subscribe((res:any) => {
      this.products = res
      this.loading = false;
     } , error => {
      this.loading = false;
      console.error(error.message )
    })
  }
}
