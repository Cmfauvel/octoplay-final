import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-connexion-form',
  templateUrl: './connexion-form.component.html',
  styleUrls: ['./connexion-form.component.scss'],
})
export class ConnexionFormComponent implements OnInit {
  errorMessage: string | null;
  fieldTextType: boolean;
  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  userId: number;
  currentUser: User;
  currentOrder: Order;
  alert: string;
  products: Product[];

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.currentProductsSubject.subscribe((resp) => {
      this.products = resp;
    });
    this.productService.selectAll();
    this.initConnexionForm();
  }

  toggledEye(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  initConnexionForm(): void {
    this.loginForm = this.fb.group({
      mail: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  seConnecter(): void {
    this.authService.logIn(this.loginForm.value).subscribe(
      (response) => {
        if (response.message === 'Adresse mail ou mot de passe erroné.') {
          return this.errorMessage = response.message;
        } else if (response.message === 'Veuillez cliquer sur le lien pour activer votre compte !') {
          return this.errorMessage = response.message;
        } else {
          localStorage.setItem('token', response.token);
          this.authService.findUserById();
          this.authService.currentUserSubject.subscribe((resp) => {
            this.currentUser = resp;
            this.orderService.selectOrder(this.currentUser.id);
            this.orderService.currentOrderSubject.subscribe((resp) => {
              this.currentOrder = resp;
              const tabQuery = [];
              for (let i = 0; i < this.products.length; i++) {
                const currentCart = JSON.parse(sessionStorage.getItem(`${this.products[i].id}`));
                if (currentCart) {
                  tabQuery.push(this.orderService.createOrUpdateItems(this.currentOrder.id, currentCart, this.currentUser.id));
                };
              };
              forkJoin(tabQuery).subscribe((resp) => {
                sessionStorage.clear();
                this.orderService.updatePriceOrder(this.currentOrder.id, this.currentUser.id)
              }, (err) => {
                console.log(err);
              })
            }, (err) => {
              console.log(err);
            });
          }, (err) => {
            console.log(err);
          })
          this.router.navigate(['/'])
        };
      },
      (error) => {
        this.router.navigateByUrl('/connexion');
      }
    );
  }
}
