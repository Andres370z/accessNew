import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Menssage, RoutersLink } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { environment } from 'src/environments/environment';

declare var $: any;
declare var particlesJS: any;
@Component({
    selector: 'app-loginClient-cmp',
    templateUrl: './loginClient.component.html'
})

export class LoginClientComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    public textAlert: any;
    public customerDetail: any = [];
    public toggleButton: any;
    public sidebarVisible: boolean;
    public nativeElement: Node;
    public form: FormGroup;
    public api = environment.img
    constructor(private element: ElementRef,
      private activatedRoute: ActivatedRoute,
        private router: Router,
        public formBuilder: FormBuilder,
        private _https:AuthService,
        private alert: AlertService,
        private localStore: LocalstoreService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.textAlert = Menssage;
        this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
          let token = parametros.get("id");
          console.log(token)
          if (token != null) {
            console.log(token)
            this.getCustomerDetail(token)
          } else {
            this.customerDetail = [];
          }
        })
    }

    ngOnInit() {
      //this.alert.loading();
      //particlesJS.load('particles-js', '../assets/particle.json', null);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0]? navbar.getElementsByClassName('navbar-toggler')[0] : 0;
          const body = document.getElementsByTagName('body')[0];
          body.classList.add('login-page');
          body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
        this.initial();
    }
    initial(){
        /* if (localStorage.getItem('token') !== null) {
          this.router.navigate([RoutersLink.home]);
        } */
        this.form = this.formBuilder.group({
          email: ["admin@electrocnis.com", Validators.compose([
            Validators.required,
            Validators.pattern(Menssage.valiEmail),
            Validators.minLength(5)
          ])],
          password: ["Electrocnis*", Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])],
        });
    }

    sidebarToggle() {
      if (this.toggleButton != null || this.toggleButton != undefined) {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
          if (this.toggleButton != undefined) {
            console.log("ojo")
            this.toggleButton.classList.remove('toggled');
          }
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
      }
    }

    getCustomerDetail(item: string){
            this.alert.loading();
            this._https.getCustomerDetail(item).then((resulta: any)=>{
                console.log(resulta); 
                  this.customerDetail = resulta
                  this.localStore.setItem(resulta, Menssage.customerDetail)
                  this.alert.messagefin();
            }).catch((err: any)=>{
              console.log(err)
              this.alert.error(Menssage.error, Menssage.server);
            });
    }

    onSubmit(item: any){
      if (this.valid(item)) {
          this.alert.loading();
          this._https.login(item).then((resulta: any)=>{
            if (resulta) {
              console.log(resulta); 
                this.localStore.setSuccessLogin(resulta)
                this.router.navigate([RoutersLink.content]);
                this.alert.success(Menssage.exito, Menssage.success);
                //this.alert.messagefin();
                this.form.reset();
              
            } else {
              this.alert.error(Menssage.error, Menssage.server);
            }
          }).catch((err: any)=>{
            console.log(err)
            this.alert.error(Menssage.error, Menssage.server);
          });
      }
  }

    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }

    valid(item: any): boolean{
        let valid = true
        if (item.email === Menssage.empty) {
          this.alert.error(Menssage.error, Menssage.email);
          valid = false
        }
        if (item.password === Menssage.empty) {
          this.alert.error(Menssage.error, Menssage.password);
          valid = false
        }
        return valid
    }
}
